import { Long } from "typeorm";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto.js";
import { Question } from "../entities/question.js";
import { Quiz } from "../entities/quiz.js";
import { AnswerService } from "../services/answerService.js";
import { OptionService } from "../services/optionService.js";
import { QuestionService } from "../services/questionService.js";
import { QuizService } from "../services/quizService.js";
import { RabbitmqService } from "../services/rabbitmqService.js";

const rabbitmq = new RabbitmqService();
const quizService = new QuizService();
const questionService = new QuestionService();
const answerService = new AnswerService();
const optionService = new OptionService();
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
      const questions = await questionService.getQuestions(parent.quizId);
      return questions;
    },
  },

  Question: {
    answers: async (parent: Question) => {
      console.log("getting answers in Question query resolver");
      const answers = await answerService.getAnswers(parent.questionId);
      return answers;
    },

    options: async (parent: Question) => {
      console.log("getting options in Question query resolver");
      const options = await optionService.getAnswers(parent.questionId);
      return options;
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
