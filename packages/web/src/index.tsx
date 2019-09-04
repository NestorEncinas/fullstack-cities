import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import "./index.css";

import * as serviceWorker from "./serviceWorker";
import client from "./configureApollo";

// import gql from "graphql-tag";

import RouteIndex from "routes";

require("dotenv").config();

// import UserContextProvider, { TUserData } from "./libs/userContext";
/**
 * test to check if connection to graphql api is working
 */

// client
//   .query({
//     query: gql`
//       {
//         findUser(id: 1) {
//           id
//           name
//           email
//         }
//       }
//     `
//   })
// .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <RouteIndex />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
