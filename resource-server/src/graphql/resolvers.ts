import { Long } from "typeorm";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto.js";
import { Question } from "../entities/question.js";
import { Quiz } from "../entities/quiz.js";
import { getAnswerRepository } from "../repositories/answerRepository.js";
import { getOptionRepository } from "../repositories/optionRepository.js";
import { getQuestionRepository } from "../repositories/questionRepository.js";
import { QuizService } from "../services/quizService.js";
import { RabbitmqService } from "../services/rabbitmqService.js";

const questionRepository = getQuestionRepository();
const optionRepository = getOptionRepository();
const answerRespoitory = getAnswerRepository();
const rabbitmq = new RabbitmqService();
const quizService = new QuizService();
await rabbitmq.setup();
rabbitmq.consumeGptRequestMessageFromMq();

interface QueryQuizArgs {
  quizId: string;
}
const resolvers = {
  Query: {
    quiz: async (_parent: any, args: QueryQuizArgs) => {
      console.log("getting quiz in query resolver");
      const quiz = await quizService.getQuizById(args.quizId);
      console.log(quiz);
      return quiz;
    },

    quizzes: async (_parent: any, args: any, contextValue: any) => {
      console.log("getting all quizzes");
      const quizzes = await quizService.getAllQuizzes(contextValue.userId);
      console.log(quizzes);
      return quizzes;
    },
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

  Mutation: {
    createQuiz: async (
      _parent: any,
      args: {
        createQuizRequest: {
          topic: String;
          title: String;
          numberOfQuestions: Long;
          numberOfOptionsPerQuestion: Long;
          difficulty: String;
        };
      },
      contextValue: { userId: string }
    ) => {
      const createQuizDto = new CreateQuizRequestDto(
        contextValue.userId,
        args.createQuizRequest.topic,
        args.createQuizRequest.title,
        args.createQuizRequest.numberOfQuestions,
        args.createQuizRequest.numberOfOptionsPerQuestion,
        args.createQuizRequest.difficulty
      );

      console.log(createQuizDto);
      rabbitmq.publishMessage(createQuizDto);

      const quiz = await quizService.getQuizById(createQuizDto.id);
      return quiz;
    },
  },
};

export default resolvers;
