import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import {
  createConnection,
  getRepository,
  useContainer,
  getConnectionOptions
} from "typeorm";
import cookieParser from "cookie-parser";
import jwt from "jwt-simple";
import { useExpressServer } from "routing-controllers";
import { Container } from "typedi";

import User from "./entity/User";
import { ConfirmationEmailController } from "./controllers/ConfirmationEmailController";

import { createSchema } from "./utils";

const bootstrap = async () => {
  useContainer(Container);

  await createConnection(await getConnectionOptions());
  // await createConnection();

  let schema: any = createSchema(Container);
  // const schema = await buildSchema({
  //   resolvers: [UserResolver],
  //   container: Container,
  //   // TODO: extract me
  //   authChecker: ({ context: { user } }) => {
  //     return !!user;
  //   }
  // });

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      // TODO: extract me to middlewares
      const { authorization } = req.headers;
      if (!authorization) {
        return null;
      }

      let token;

      try {
        token = authorization.replace("Bearer ", "");
      } catch (e) {
        res.status(401).send("Unauthorized");
      }

      //@ts-ignore
      let decoded = jwt.decode(token, process.env.JWT_SECRET);

      const { id } = decoded;
      const user = await getRepository(User).findOne({
        where: { id }
      });
      //@ts-ignore TODO: check how to type this
      req.user = user;

      return {
        //@ts-ignore
        user: req.user
      };
    }
  });

  const app = express();
  // routing-controllers with express
  useExpressServer(app, {
    controllers: [ConfirmationEmailController]
  });
  app.use(cors());
  app.use(cookieParser());

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Apollo Server on http://localhost:4000/graphql");
  });
};

bootstrap();
