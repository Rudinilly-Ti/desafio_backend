require("dotenv").config({
  path: process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
});

module.exports = {
  type:"postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dropSchema: process.env.DROP,
  entities: ["src/entity/*.ts"],
  logging: ["error"],
  synchronize: true
}