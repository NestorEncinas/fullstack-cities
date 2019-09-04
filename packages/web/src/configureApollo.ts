import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import Cookie from "js-cookie";

require("dotenv").config();
/**
 * Login component where i add Bearer to token
 */

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const { accessToken } = Cookie.get();
  console.log("BBBB", accessToken);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql"
//     // credentials: "include"
//   }),
//   cache: new InMemoryCache()
// });

export default client;
