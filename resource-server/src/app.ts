import express from "express";
import "reflect-metadata";
import "es6-shim";
import dataSource from "../config/ormconfig";
import { quizController } from "./quiz/controllers/quizController";
import { auth0JwtMiddleware } from "./middleware/authMiddleware";
const cors = require("cors");

const PORT = process.env.PORT;

// Server setup code
const app = express();
app.use(express.json());
app.use(cors());
dataSource;

// configure api endpoints
app.use("/api/v1", auth0JwtMiddleware, quizController);
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
