import React, { useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo";

import client from "./configureApollo";
import RouteIndex, { TUserData } from "routes";

import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";
import { UserContext } from "context/userContext";
import { useMemo } from "react";

require("dotenv").config();

const App: React.FC = () => {
  const [user, setUser] = useState<TUserData | null>(null);

  const value: any = useMemo(() => ({ user, setUser }), [user, setUser]);

  /**
   * Hook that will run when app is rendered to check
   * for User data if JWT exists?
   */
  useEffect(() => {
    const tete = getUserDataFromAccessToken();
    console.log("User From JWT Effect", tete);
    setUser(getUserDataFromAccessToken());
    console.log("App use effect, set User");
  }, []);

  return (
    <>
      <div> Current user : {JSON.stringify(user, null, 2)} </div>
      <ApolloProvider client={client}>
        <UserContext.Provider value={value}>
          <RouteIndex />
        </UserContext.Provider>
      </ApolloProvider>
      ;
    </>
  );
};

export default App;
