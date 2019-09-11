require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
console.log("TETE", process.env.DB_USERNAME);
const config = {
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
