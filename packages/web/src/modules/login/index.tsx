import React from "react";
import { Formik } from "formik";
import _get from "lodash/get";
import cookie from "js-cookie";
import { Form, Icon, Button } from "antd";
import { Link } from "react-router-dom";

import CustomInputField from "../../components/InputField/index";

import { LOGIN_VALIDATION_SCHEMA } from "./validation";
import { formErrors } from "utils/formErrors";

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

const RegisterFormik: React.FC<ILoginFormProps> = ({ login, history }) => {
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
            console.log("Where are the errors? =>", loginResponse);
            const accessToken = _get(loginResponse, ["data", "register"]);

            console.log("AAAA", accessToken);

            // how to display errors on form?
            // [{path: 'email': message: 'invalid....'}]
            // {email: invalid}
            if (loginResponse) {
              // FIXME: check if im working
              return formErrors(loginResponse);
            }

            if (accessToken) {
              cookie.set("accessToken", accessToken, { expires: 1 });
              history.push("/tete");
            }
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          errors
        }) => (
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
              {/* <Form.Item
                help={touched.email && errors.email ? errors.email : ""}
                validateStatus={
                  touched.email && errors.email ? "error" : undefined
                }
              >
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </Form.Item> */}
              {/* <Form.Item
                help={
                  touched.password && errors.password ? errors.password : ""
                }
                validateStatus={
                  touched.password && errors.password ? "error" : undefined
                }
              >
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Form.Item> */}

              <Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
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
                Or <Link to="/register">Sign up</Link>
              </Form.Item>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default RegisterFormik;
