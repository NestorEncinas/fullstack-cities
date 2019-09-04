import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import _get from "lodash/get";

import RegisterFormik from "./index";

import { RouteComponentProps } from "react-router";

interface FUCK_HISTORY extends RouteComponentProps {}

const REGISTER_MUTATION = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
  # mutation Register($email: String!, $password: String!) {
  #   register(email: $email, password: $password)
  # }
`;

const RegisterIndex: React.SFC<FUCK_HISTORY> = ({ history }) => {
  /**
   * mutation login with data email and password
   *
   * https://www.apollographql.com/docs/react/api/react-hooks/
   */

  const [register] = useMutation(REGISTER_MUTATION);

  return (
    <>
      <RegisterFormik
        history={history}
        register={values => register({ variables: { registerInput: values } })}
      />
    </>
  );
};

export default RegisterIndex;
