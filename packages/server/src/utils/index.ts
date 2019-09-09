import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";

import UserResolver from "../resolvers/User";

export const createSchema = async (container: any) =>
  buildSchema({
    container,
    resolvers: [UserResolver],
    // TODO: extract me
    authChecker: ({ context: { user } }) => {
      return !!user;
    }
  });
