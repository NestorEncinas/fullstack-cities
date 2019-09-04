import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";

import UserResolver from "../resolvers/User";
import { Container } from "typedi";

useContainer(Container);
export const createSchema = async () =>
  buildSchema({
    resolvers: [UserResolver],
    container: Container,
    // TODO: extract me
    authChecker: ({ context: { user } }) => {
      return !!user;
    }
  });
