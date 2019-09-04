import React from "react";
import { Route, Redirect } from "react-router-dom";

import { SessionContext } from "../context/SessionContext";

interface IPrivateRoute {
  component: any;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const session = React.useContext(SessionContext);
  console.log("adadadasdad", session);

  return (
    <>
      <Route
        {...rest}
        render={props =>
          session ? (
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
