import cors from "cors";
import dotenv from "dotenv";
import "es6-shim";
import express from "express";
import "reflect-metadata";
import dataSource from "../config/ormconfig.js";
import swaggerDocs from "../swagger/swagger.js";
import client from "./redis/redisConfig.js";
import { getQuizRepository } from "./repositories/quizRepository.js";
import { getUserRepository } from "./repositories/userRepository.js";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { Question } from "./entities/question.js";
import { Quiz } from "./entities/quiz.js";
import { typeDefs } from "./graphql/schema.js";
import { getAnswerRepository } from "./repositories/answerRepository.js";
import { getOptionRepository } from "./repositories/optionRepository.js";
import { getQuestionRepository } from "./repositories/questionRepository.js";
import { QuizService } from "./services/quizService.js";

import jwt, { VerifyOptions } from "jsonwebtoken";

import axios from "axios";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { applyMiddleware } from "graphql-middleware";

const questionRepository = getQuestionRepository();
const optionRepository = getOptionRepository();
const answerRespoitory = getAnswerRepository();
const quizService = new QuizService();

// move resolver interface types to a new folder later
interface QueryQuizArgs {
  quizId: string;
}

const resolvers = {
  Query: {
    quiz: async (parent: any, args: QueryQuizArgs) => {
      console.log("getting quiz in query resolver");
      const quiz = await quizService.getQuizById(args.quizId);
      console.log(quiz);
      return quiz;
    },

    // quizzes: async (parent: any, args: any) => {
    //   console.log("getting all quizzes");
    //   const quizzes = await quizService.getAllQuizzes(args.);
    // },
  },
  Quiz: {
    questions: async (parent: Quiz) => {
      console.log("getting questions in query resolver");
      const questions = await questionRepository.find({
        where: {
          quiz: {
            quizId: parent.quizId,
          },
        },
      });

      if (questions) {
        return questions;
      }

      return [];
    },
  },

  Question: {
    answers: async (parent: Question) => {
      console.log("getting answers in Question query resolver");
      const answers = await answerRespoitory.find({
        where: {
          question: {
            questionId: parent.questionId,
          },
        },
      });

      if (answers) {
        return answers;
      }

      return [];
    },

    options: async (parent: Question) => {
      console.log("getting options in Question query resolver");
      const options = await optionRepository.find({
        where: {
          question: {
            questionId: parent.questionId,
          },
        },
      });

      if (options) {
        return options;
      }

      return [];
    },
  },
};

// const middleware = [auth0JwtMiddleware]
// const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
// const schemaWithMiddleware = applyMiddleware(executableSchema, ...middleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function validateAuth0Token(token: string) {
  try {
    // Fetch JWKS (JSON Web Key Set) from Auth0
    const jwksUrl =
      "https://dev-w5ogvkwglktdnp2m.us.auth0.com/.well-known/jwks.json";
    const jwksResponse = await axios.get(jwksUrl);
    const jwks = jwksResponse.data.keys;

    // Decode the token to get the kid (key ID)
    const decodedToken = jwt.decode(token, { complete: true });
    const { kid } = decodedToken!.header;
    const jwk = jwks.find(
      (key: { kid: string | undefined }) => key.kid === kid
    );

    if (!jwk) {
      throw new Error("Key not found in JWKS");
    }

    // Construct the options for jwt.verify
    const publicKey = certToPEM(jwk.x5c[0]);
    const options: VerifyOptions = {
      audience: process.env.AUTH0_AUDIENCE!,
      issuer: process.env.AUTH0_ISSUER!,
      algorithms: ["RS256"],
    };

    // Verify the token using the provided public key and options
    const verifiedToken = jwt.verify(token, publicKey, options) as {
      sub: string;
    };

    return verifiedToken.sub;
  } catch (error) {
    throw new Error("Token verification failed: " + error);
  }
}

function certToPEM(cert: string) {
  return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`;
}

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const userId = await validateAuth0Token(token!);

    // add the user to the context
    return {
      userId,
    };
  },
});
console.log(" Apollo running on port 4000");

dotenv.config();

const PORT = parseInt(process.env.PORT!);

// Server setup code
const app = express();
app.use(express.json());
app.use(cors());

dataSource;

// redis setup code, map userId -> set of quizId
const userRepo = getUserRepository();
const quizRepo = getQuizRepository();

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

// configure api endpoints
// app.use("/api/v1", auth0JwtMiddleware, quizController);

app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
