import React from "react";
import { ApolloProvider } from "react-apollo";

import client from "./configureApollo";
import RouteIndex from "routes";

require("dotenv").config();

const App: React.FC = () => {
  return (
    <>
      {/* <div> Current user : {JSON.stringify(user, null, 2)} </div> */}
      <ApolloProvider client={client}>
        <RouteIndex />
      </ApolloProvider>
      ;
    </>
  );
};

export default App;
