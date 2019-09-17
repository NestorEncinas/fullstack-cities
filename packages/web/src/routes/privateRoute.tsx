import React from "react";
import { Route, Redirect } from "react-router-dom";
import _pick from "lodash/pick";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

interface IPrivateRoute {
  component: any;
  path: string;
  [key: string]: any;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const user = getUserDataFromAccessToken();
  console.log("User", user);
  return (
    <>
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component user={user} {...props} />
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
