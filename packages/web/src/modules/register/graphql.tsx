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

  const [register, { error }] = useMutation(REGISTER_MUTATION);
  // console.log("TETE", error);
  // if (error) {
  //   error.graphQLErrors.map(({ message }, i) => {
  //     alert(message);
  //   });
  // }
  return (
    <>
      <RegisterFormik
        history={history}
        register={values => register({ variables: { registerInput: values } })}
        errors={error}
      />
    </>
  );
};

export default RegisterIndex;
