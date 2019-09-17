import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import LoginFormik from "./index";

import { RouteComponentProps } from "react-router";

export interface FUCK_HISTORY extends RouteComponentProps {}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      idToken
      expirationDate
      refreshToken
    }
  }
`;

const LoginIndex: React.FC<FUCK_HISTORY> = ({ history }) => {
  const [login] = useMutation(LOGIN_MUTATION);

  return (
    <LoginFormik
      history={history}
      login={values => login({ variables: values })}
    />
  );
};

export default LoginIndex;
