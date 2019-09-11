import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo";
import { NextFC } from "next";
// import { SessionContext } from "context/SessionContext";

import { RouteComponentProps } from "react-router";
import { UserContext } from "context/UserContext";
// import { TUserData } from "libs/userContext";

// const UserContext = React.createContext<TUserData | null>(null);
interface FUCK_HISTORY extends RouteComponentProps {}

const TEST_AUTH_ME = gql`
  {
    me {
      id
      email
    }
  }
`;

const TestAuth: NextFC<FUCK_HISTORY> = ({ history }: any) => {
  // const session = React.useContext(SessionContext);
  const user = React.useContext(UserContext);
  console.log(user);
  if (user === null) {
    history.push("/login");
  }
  const { loading, error, data } = useQuery(TEST_AUTH_ME);
  if (!loading && error) {
    return <p> Loading...</p>;
  }

  if (!loading && !data.me) {
    return <p> Not found...</p>;
  }
  console.log("Data", data);

  return <div> TETE </div>;
};

export default TestAuth;
