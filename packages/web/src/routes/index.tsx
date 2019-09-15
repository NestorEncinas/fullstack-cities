import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import RegisterIndex from "../modules/register/graphql";
import TestAuth from "../modules/testAuth/graphql";
import Home from "../modules/home/index";
import Tete from "../modules/tete/index";
import LoginIndex from "modules/login/graphql";
import ConfirmationEmail from "../modules/confirmationEmail/index";
import PrivateRoute from "./privateRoute";
import { useContext } from "react";
import { UserContext } from "context/userContext";
// import NavigationTopBar from "components/Navigation/TopBar";

export type TUserData = {
  user: {
    id: number;
  };
};

const RouteIndex: React.FC = () => {
  const user = useContext(UserContext);
  console.log("Route Index User context", user);
  return (
    <>
      {/* <NavigationTopBar /> */}
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/tete">Test Auth</Link>
              </li>
              <li>
                <Link to="/protected">Protected Custom Component</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterIndex} />
            <Route path="/login" component={LoginIndex} />
            <Route path="/tete" component={TestAuth} />
            <Route path="/confirmation" component={ConfirmationEmail} />
            {/* protected routes only for log in users */}
            <PrivateRoute path="/protected" component={Tete} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default RouteIndex;
