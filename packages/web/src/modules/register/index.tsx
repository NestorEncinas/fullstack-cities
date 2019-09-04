import React from "react";
import { Formik } from "formik";
import _get from "lodash/get";
import cookie from "js-cookie";
import { Form, Icon, Button } from "antd";

import CustomInputField from "../../components/InputField/index";

import { REGISTER_VALIDATION_SCHEMA } from "./validation";

type TFormValues = {
  email: string;
  password: string;
};

interface IRegisterFormProps {
  register: (values: TFormValues) => Promise<any>;
  history: any;
}

// register connector
// container -> view
// container -> connector -> view
// controller -> connector -> view

const RegisterFormik: React.FC<IRegisterFormProps> = ({
  register,
  history
}) => {
  return (
    <>
      <Formik
        validationSchema={REGISTER_VALIDATION_SCHEMA}
        validateOnChange={false}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const loginResponse = await register(values);
            const accessToken = _get(loginResponse, ["data", "register"]);

            console.log("AAAA", accessToken);

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
                  Register
                </Button>
                <button type="submit">Submit </button>
              </Form.Item>
              <Form.Item>
                Or <a href="">login now!</a>
              </Form.Item>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default RegisterFormik;
