import { Question } from "../entities/question.js";
import client from "../redis/redisConfig.js";
import { getQuestionRepository } from "../repositories/questionRepository.js";

export class QuestionService {
  questionRepository = getQuestionRepository();

  getQuestions = async (quizId: string): Promise<Question[]> => {
    // first check if the parent quiz's questions list is still in memory
    const quizQuestionsListKey = `${quizId}:questions`;

    const questionIds = await client.lRange(quizQuestionsListKey, 0, -1);
    console.log(questionIds);
    let questions: Question[] = [];

    if (questionIds != null) {
      // means the questions are still in memory
      for (let id of questionIds) {
        const question = await this.getQuestion(id);
        questions.push(question);
      }
    } else {
      questions = await this.questionRepository.find({
        where: {
          quiz: {
            quizId,
          },
        },
      });
    }

    return questions;
  };

  getQuestion = async (questionId: string): Promise<Question> => {
    // we only retrieve the question's id and content. the resolver will call on the resolver for option and answer separately
    const question: Question = new Question();
    let questionContent = await client.lIndex(questionId, 2);

    if (questionContent != null) {
      question.content = questionContent;
    } else {
      const questionFromDb = await this.questionRepository.findOne({
        where: {
          questionId,
        },
      });

      if (questionFromDb == null) {
        throw Error("Question not found in Database - questionService.ts");
      }
      questionContent = questionFromDb.content;
    }

    question.questionId = questionId;
    return question;
  };
}
