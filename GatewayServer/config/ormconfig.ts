import { DataSource } from "typeorm";
import { MqResponse } from "../src/entities/mqResponse";
import dotenv from "dotenv";

dotenv.config;

// Your other imports and code

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "allanyin",
  password: "",
  database: "QuizGPT",
  entities: [MqResponse],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default dataSource;
