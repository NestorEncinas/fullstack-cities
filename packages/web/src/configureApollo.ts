import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
// import { onError } from "apollo-link-error";
import Cookie from "js-cookie";

require("dotenv").config();
/**
 * Login component where i add Bearer to token
 */

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

/**
 * Apollo middleware to inspect and modify every request made over the link before
 */
const authLink = setContext((req, { headers }) => {
  // we obtain idToken & refreshToken from cookies
  const { idToken } = Cookie.get();

  // expiration date of idToken > actual Time
  if (idToken) {
    return {
      headers: {
        ...headers,
        authorization: idToken ? `Bearer ${idToken}` : ""
      }
    };
  }
});

/**
 * After Apollo middleware
 */

const logoutLink = setContext((_, { headers }) => {
  const { idToken, refreshToken } = Cookie.get();

  if (idToken) {
    let now = new Date();
    now.setTime(now.getTime() + 2 * 60 * 1000);
    Cookie.set("idToken", idToken, {
      expires: now
    });
  }
  if (refreshToken) {
    Cookie.set("refreshToken", refreshToken, {
      expires: 1
    });
  }
});

const client = new ApolloClient({
  link: authLink.concat(logoutLink.concat(httpLink)),
  // link: from([authLink, logoutLink]),
  cache: new InMemoryCache()
});

export default client;

// const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) => {
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   }
//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`);
//   }
// });
