import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../../utils";
import User from "../../entity/User";

interface Options {
  source: string;
  variableValues?: {
    [key: string]: any;
  };
  user?: any;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({
  source,
  variableValues,
  user
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      user
    }
  });
};
