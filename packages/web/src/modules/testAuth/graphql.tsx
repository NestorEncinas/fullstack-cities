import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useQuery } from "react-apollo";

// import { SessionContext } from "context/SessionContext";

import { RouteComponentProps } from "react-router";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";
// import { UserContext } from "context/userContext";

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

const TestAuth: React.FC<FUCK_HISTORY> = ({ history }: any) => {
  // const authenticate = isAuth();
  // const session = React.useContext(SessionContext);
  // const [user, setUser] = useState<any | null>(null);

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  /**
   * Hook that will run when app is rendered to check
   * for User data if JWT exists?
   */
  useEffect(() => {
    const user = getUserDataFromAccessToken();
    console.log("App use effect, set User", user);
    if (!user) {
      history.push("/login");
    }
  }, []);
  // const { user } = useContext(UserContext);

  // if (user === null) {
  //   history.push("/login");
  // }

  const { loading, error, data } = useQuery(TEST_AUTH_ME);
  if (!loading && error) {
    return <p> Loading...</p>;
  }

  if (!loading && !data.me) {
    return <p> Not found...</p>;
  }
  console.log("Data", data);

  return (
    <div>
      {" "}
      Hello
      {/* {JSON.stringify(user, null, 2)} you are log in. */}
    </div>
  );
};

export default TestAuth;
