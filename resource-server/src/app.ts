import * as http from "http";
import express from "express";
const app = express();

const PORT = process.env.PORT;
import "reflect-metadata";
const { dataSource } = require("../config/ormconfig");
const { rabbitMqConfig } = require("./rabbitmq/rabbitMqConfig");

rabbitMqConfig;
dataSource;

// const accountController = require("./src/account/controllers/accountController");
rabbitMqConfig();

// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");

// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, TypeScript!\n");
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
