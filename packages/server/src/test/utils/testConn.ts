import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "mysql",
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'root',
    database: "test-db",
    synchronize: drop,
    dropSchema: drop,
    logging: false,
    entities: [__dirname + "../../../entity/*.ts"],
    // migrations: ["./src/migrations/*.ts"],
    cli: {
      entitiesDir: "./src/entity"
      //   migrationsDir: "./src/migrations"
    }
  });
};
