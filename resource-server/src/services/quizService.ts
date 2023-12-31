import { instanceToPlain, plainToInstance } from "class-transformer";
import dotenv from "dotenv";
import { Question } from "../entities/question.js";
import { Quiz } from "../entities/quiz.js";
import { QuizAttempt } from "../entities/quizAttempt.js";
import client from "../redis/redisConfig.js";
import { getQuestionRepository } from "../repositories/questionRepository.js";
import { getQuizAttemptRepository } from "../repositories/quizAttemptRepository.js";
import { getQuizRepository } from "../repositories/quizRepository.js";

dotenv.config();

export class QuizService {
  quizRepository = getQuizRepository();
  quizAttemptRepository = getQuizAttemptRepository();
  questionRepository = getQuestionRepository();

  async getAllQuizzes(userId: string): Promise<Quiz[]> {
    const quizList: Quiz[] = [];
    const quizIdSet: string[] = await client.sMembers(userId);
    let quiz: Quiz;

    for (const quizId of quizIdSet) {
      const result = await client.json.get(quizId);
      if (result != null) {
        quiz = plainToInstance(Quiz, result);
      } else {
        quiz = await this.getQuizById(quizId);

        const jsonFormattedData = {
          quizId: quiz.quizId,
          title: quiz.title,
          questions: JSON.stringify(quiz.questions),
          attempts: JSON.stringify(quiz.attempts),
        };
        await client.json.set(quiz.quizId, "$", jsonFormattedData);
        await client.expire(quiz.quizId, 60 * 60 * 3);
      }

      quizList.push(quiz);
    }

    return quizList;
  }

  async getQuizById(id: string): Promise<Quiz> {
    let quiz: Quiz | null;
    const result = await client.json.get(id);

    if (result != null) {
      quiz = plainToInstance(Quiz, result);
      return quiz;
    }

    const maxAttempts = 10;
    const delayMs = 1000;
    let attempts = 0;

    while (attempts < maxAttempts) {
      quiz = await this.quizRepository.findOne({
        where: { quizId: id },
        relations: ["questions", "questions.options", "questions.answers"],
      });

      if (quiz) {
        const plain = instanceToPlain(quiz);
        await client.json.set(quiz.quizId, "$", plain);
        await client.expire(quiz.quizId, 60 * 60 * 3);

        return quiz;
      }

      await this.delay(delayMs);
      attempts++;
    }

    throw new Error(`Quiz not found with id: ${id}`);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async saveQuiz(quiz: Quiz): Promise<Quiz> {
    const quizEntity = await this.quizRepository.save(quiz);
    const plain = instanceToPlain(quizEntity);
    await client.json.set(quizEntity.quizId, "$", plain);
    await client.expire(quizEntity.quizId, 60 * 60 * 3);

    return quizEntity;
  }

  async deleteQuiz(userId: string, quizId: string): Promise<void> {
    const quiz = await this.getQuizById(quizId);
    await this.quizRepository.remove(quiz);
    // console.log(quiz);
    await client.json.del(quizId);
    await client.sRem(userId, quizId);
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOneBy({
      questionId: id,
    });
    if (!question) {
      throw new Error(`Question not found with id: ${id}`);
    }
    return question;
  }

  async saveQuestion(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }

  async deleteQuestion(id: number): Promise<void> {
    const question = await this.getQuestionById(id);
    await this.questionRepository.remove(question);
  }

  async getAllQuizAttempts(): Promise<QuizAttempt[]> {
    return this.quizAttemptRepository.find();
  }

  async getQuizAttemptById(id: string): Promise<QuizAttempt> {
    const quizAttempt = await this.quizAttemptRepository.findOneBy({
      quizAttemptId: id,
    });
    if (!quizAttempt) {
      throw new Error(`Quiz attempt not found with id: ${id}`);
    }
    return quizAttempt;
  }

  async saveQuizAttempt(
    attempt: QuizAttempt,
    quizId: string
  ): Promise<QuizAttempt> {
    console.log(attempt);
    const associatedQuiz = await this.quizRepository.findOne({
      where: { quizId },
      relations: [
        "questions",
        "questions.options",
        "questions.answers",
        "attempts",
      ],
    });

    console.log(associatedQuiz);
    if (!associatedQuiz) {
      throw new Error(`Quiz with ID ${quizId} not found.`);
    }

    associatedQuiz?.attempts.push(attempt);
    await this.quizRepository.save(associatedQuiz);

    const response = await this.quizAttemptRepository.save(attempt);
    console.log(response);

    for (let userAnswer of attempt.userAnswers) {
    }

    // we can go ahead and check this in redis, and update it, find it, and save it
    const saveQuiz = await this.quizRepository.findOne({
      where: { quizId },
      relations: [
        "questions",
        "questions.options",
        "questions.answers",
        "attempts",
        "attempts.userAnswers",
      ],
    });

    console.log(saveQuiz);
    return response;
  }

  async deleteQuizAttempt(id: string): Promise<void> {
    const quizAttempt = await this.getQuizAttemptById(id);
    await this.quizAttemptRepository.remove(quizAttempt);
  }
}
