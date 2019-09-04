import * as React from "react";
import { FieldProps, Field } from "formik";
import { Form, Input, Icon } from "antd";

interface ICustomInputField {
  name: string;
  type: string;
  placeHolder?: string;
  prefix: React.ReactNode;
}

const CustomInputField: React.SFC<ICustomInputField> = ({
  name,
  type,
  placeHolder,
  prefix,
  // field, // { name, value, onChange, onBlur }
  // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <>
      <Field
        name={name}
        render={({
          field: { name, value, onChange, onBlur },
          form: { touched, errors }
        }: FieldProps) => {
          const errorMsg = touched[name] && errors[name];
          return (
            <Form.Item
              help={errorMsg}
              validateStatus={errorMsg ? "error" : undefined}
            >
              <Input
                value={value}
                name={name}
                type={type}
                placeholder={placeHolder}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={onChange}
                onBlur={onBlur}
                {...props}
              />
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default CustomInputField;
