import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "context/userContext";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

interface IPrivateRoute {
  component: any;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const { user }: any = React.useContext(UserContext);
  console.log("adadadasdad", user);
  useEffect(() => {
    const user = getUserDataFromAccessToken();
    console.log("App use effect, set User", user);
  }, []);
  return (
    <>
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
