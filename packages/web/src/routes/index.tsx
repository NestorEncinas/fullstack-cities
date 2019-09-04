import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegisterIndex from "../modules/register/graphql";
import TestAuth from "../modules/testAuth/graphql";
import Home from "../modules/home/index";
import Tete from "../modules/tete/index";

import PrivateRoute from "./privateRoute";
import { SessionContext } from "context/SessionContext";
import obtainAuthToken from "libs/withAuth";
import { UserContext } from "context/UserContext";

import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

const RouteIndex: React.FC = () => {
  const [session, setSession] = React.useState(obtainAuthToken());
  const [user, setUser] = React.useState(getUserDataFromAccessToken());

  React.useEffect(() => {
    setSession(obtainAuthToken());
    setUser(getUserDataFromAccessToken());
  }, [session]);

  console.log("User after effect", user);
  console.log("Session after effect", session);
  return (
    // FIX ME:  do I need Session?
    <SessionContext.Provider value={session}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterIndex} />
            <Route path="/tete" component={TestAuth} />
            {/* protected routes only for log in users */}
            <PrivateRoute path="/protected" component={Tete} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </SessionContext.Provider>
  );
};

export default RouteIndex;
