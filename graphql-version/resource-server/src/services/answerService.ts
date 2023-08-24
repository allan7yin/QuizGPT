import { plainToInstance } from "class-transformer";
import { Answer } from "../entities/answer.js";
import client from "../redis/redisConfig.js";
import { getAnswerRepository } from "../repositories/answerRepository.js";

export class AnswerService {
  answerRepository = getAnswerRepository();

  // at the moment, questions can only have one correct answer. We can add a getAnswer if we plan to have multiple in the future
  async getAnswers(questionId: string): Promise<Answer[]> {
    const questionAnswersListKey = `${questionId}:answers`;
    const answerString = await client.lIndex(questionAnswersListKey, 0);
    let answers: Answer[] = [];

    if (answerString != null) {
      const answerPlain = JSON.parse(answerString);
      const answer = plainToInstance(Answer, answerPlain);
      answers.push(answer);
    } else {
      const dbRsult = await this.answerRepository.findOne({
        where: {
          question: {
            questionId,
          },
        },
      });

      if (dbRsult == null) {
        throw Error("Answer not found in Database - answerService.ts");
      } else {
        answers.push(dbRsult);
      }
    }

    return answers;
  }
}
