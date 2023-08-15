import { Question } from "../entities/question";
import { Quiz } from "../entities/quiz";
import { QuizAttempt } from "../entities/quizAttempt";
import { getQuizRepository } from "../repositories/quizRepository";
import { getQuizAttemptRepository } from "../repositories/quizAttemptRepository";
import { getQuestionRepository } from "../repositories/questionRepository";

export class quizService {
  quizRepository = getQuizRepository();
  quizAttemptRepository = getQuizAttemptRepository();
  questionRepository = getQuestionRepository();

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({
      quizId: id,
    });
    if (!quiz) {
      throw new Error(`Quiz not found with id: ${id}`);
    }
    return quiz;
  }

  async saveQuiz(quiz: Quiz): Promise<Quiz> {
    return this.quizRepository.save(quiz);
  }

  async deleteQuiz(id: number): Promise<void> {
    const quiz = await this.getQuizById(id);
    await this.quizRepository.remove(quiz);
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

  async getQuizAttemptById(id: number): Promise<QuizAttempt> {
    const quizAttempt = await this.quizAttemptRepository.findOneBy({
      quizAttemptId: id,
    });
    if (!quizAttempt) {
      throw new Error(`Quiz attempt not found with id: ${id}`);
    }
    return quizAttempt;
  }

  async saveQuizAttempt(attempt: QuizAttempt): Promise<QuizAttempt> {
    return this.quizAttemptRepository.save(attempt);
  }

  async deleteQuizAttempt(id: number): Promise<void> {
    const quizAttempt = await this.getQuizAttemptById(id);
    await this.quizAttemptRepository.remove(quizAttempt);
  }
}
