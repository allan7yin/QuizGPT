import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import cors from "cors";
import dotenv from "dotenv";
import "es6-shim";
import express from "express";
import "reflect-metadata";
import dataSource from "../config/ormconfig.js";
import swaggerDocs from "../swagger/swagger.js";
import resolvers from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/schema.js";
import validateAuth0Token from "./middleware/authMiddleware.js";
import client from "./redis/redisConfig.js";
import { getUserRepository } from "./repositories/userRepository.js";

dotenv.config();

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const userId = await validateAuth0Token(token!);

    return {
      userId,
    };
  },
});
console.log(" Apollo running on port 4000");

// Express Server Setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = parseInt(process.env.PORT!);

// TypORM + PostgreSQL Setup
dataSource;

// Redis Stack Server Setup
const userRepo = getUserRepository();

const usersWithQuizIds = await userRepo
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.quizzes", "quiz")
  .select(["user.userId", "quiz.quizId"])
  .getMany();

usersWithQuizIds.forEach((user) => {
  user.quizzes.forEach(async (quiz) => {
    await client.sAdd(user.userId, quiz.quizId);
  });
});

// delete below soon

// configure api endpoints
// app.use("/api/v1", auth0JwtMiddleware, quizController);

// app.get("/api/public", function (req, res) {
//   res.json({
//     message:
//       "Hello from a public endpoint! You don't need to be authenticated to see this.",
//   });
// });

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
