import React, { useContext } from "react";
import { Formik } from "formik";
import _get from "lodash/get";
import cookie from "js-cookie";
import { Form, Icon, Button } from "antd";
import { Link } from "react-router-dom";
// import moment from "moment";

import CustomInputField from "../../components/InputField/index";

import { LOGIN_VALIDATION_SCHEMA } from "./validation";
import { UserContext } from "context/userContext";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

// import { formErrors } from "utils/formErrors";
// import { UserContext } from "../../context/UserContext";
// import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

type TFormValues = {
  email: string;
  password: string;
};

interface ILoginFormProps {
  login: (values: TFormValues) => Promise<any>;
  history: any;
}

// register connector
// container -> view
// container -> connector -> view
// controller -> connector -> view

const LoginFormik: React.FC<ILoginFormProps> = ({ login, history }) => {
  const { setUser }: any = useContext(UserContext);
  // console.log("user login", user);
  return (
    <>
      <Formik
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        validateOnChange={false}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const loginResponse = await login(values);

            // get idToken, refreshToken  from the login response
            const { idToken, refreshToken } = _get(
              loginResponse,
              ["data", "login"],
              []
            );
            /**
             * If login response from backend well good so we
             * So we can set cookies for tokens and redirect to index page
             */
            if (idToken && refreshToken) {
              let now = new Date();
              now.setTime(now.getTime() + 2 * 60 * 1000);
              cookie.set("idToken", idToken, {
                expires: now
              });
              cookie.set("refreshToken", refreshToken, {
                expires: 1
              });
              setUser(getUserDataFromAccessToken());
              // history.push("/tete");
            }
            // const user = getUserDataFromAccessToken();
            // setUser(user);
            history.push("/tete");
            // how to display errors on form?
            // [{path: 'email': message: 'invalid....'}]
            // {email: invalid}
            // if (loginResponse) {
            //   // FIXME: check if im working
            //   return formErrors(loginResponse);
            // }
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
        render={({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <div style={{ width: 400, margin: "auto" }}>
              {/* name, type, placeholder, value */}
              <CustomInputField
                name="email"
                placeHolder="Email"
                type="text"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
              <CustomInputField
                name="password"
                type="password"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
              {/* <Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
                <button type="submit">Submit </button>
              </Form.Item>
              <Form.Item>
                Or <Link to="/">Sign up</Link>
              </Form.Item>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default LoginFormik;
