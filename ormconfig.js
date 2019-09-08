require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
console.log(process.env.DB_USER);
const config = {
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.database,
  synchronize: true,
  logging: false,
  entities: [isProduction ? "build/entity/*.js" : "src/entity/*.ts"],
  migrations: [isProduction ? "build/migrations/*.js" : "src/migrations/*.ts"],
  cli: {
    entitiesDir: "./src/entity",
    migrationsDir: "./src/migrations"
  }
};

module.exports = config;
