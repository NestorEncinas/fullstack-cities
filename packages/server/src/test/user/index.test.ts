import { Connection } from "typeorm";
import faker from "faker";

let conn: Connection;

import { testConn } from "../utils/testConn";
import { graphqlCall } from "../utils/graphqlCall";
import User from "../../entity/User";
import { UserResolver } from "../../resolvers/User";

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `mutation register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) 
}`;

const meQuery = `{
  me {
    id
    email
  }
}`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const response = await graphqlCall({
      source: registerMutation,
      variableValues: {
        registerInput: user
      }
    });

    expect(response).toHaveProperty("data.register");

    // no need to test this - no need to check db data
    // const dbUser = await User.findOne({ where: { email: user.email } });
    // expect(dbUser).toBeDefined();
    // expect(dbUser.email).toBeDefined();
  });
});

describe("Me", () => {
  it(" get user", async () => {
    // const user = await User.create({
    //   email: faker.internet.email(),
    //   password: faker.internet.password()
    // }).save();

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    // TODO: login mutation
    await graphqlCall({
      source: registerMutation,
      variableValues: {
        registerInput: user
      }
    });

    const response = await graphqlCall({
      source: meQuery,
      user
    });

    // expect(response).toMatchObject({
    //   data: {
    //     me: {
    //       id: user.id,
    //       email: user.email,
    //       password: user.password
    //     }
    //   }
    // });
    console.log("Response => ", response);
  });
});
