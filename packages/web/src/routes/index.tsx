import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegisterIndex from "../modules/register/graphql";
import TestAuth from "../modules/testAuth/graphql";
import Home from "../modules/home/index";
import Tete from "../modules/tete/index";
import ConfirmationEmail from "../modules/confirmationEmail/index";

import PrivateRoute from "./privateRoute";
// import { SessionContext } from "context/SessionContext";
// import obtainAuthToken from "libs/withAuth";
import { UserContext } from "../libs/userContext";

// import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";
import LoginIndex from "modules/login/graphql";

export type TUserData = {
  user: {
    id: number;
  };
};

const RouteIndex: React.FC = () => {
  // const [user, setUser] = useState<TUserData | null>(null);
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // const [session, setSession] = React.useState<string | null>(null);
  // const [user, setUser] = React.useState<TUserData | null>(null);

  // React.useEffect(() => {
  //   setSession(obtainAuthToken());
  //   setUser(getUserDataFromAccessToken());
  // }, [session]);
  {
    /* 
                // @ts-ignore */
  }
  return (
    // FIX ME:  do I need Session?

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        <UserContext.Provider value={{ value }}>
          <Route path="/register" component={RegisterIndex} />
          <Route path="/login" component={LoginIndex} />
          <Route path="/tete" component={TestAuth} />
          <Route path="/confirmation" component={ConfirmationEmail} />
          {/* protected routes only for log in users */}
          <PrivateRoute path="/protected" component={Tete} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default RouteIndex;
