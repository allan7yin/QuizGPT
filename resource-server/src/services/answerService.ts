import { Answer } from "../entities/answer";
import { getAnswerRepository } from "../repositories/answerRepository";

export class AnswerService {
  answerRepository = getAnswerRepository();

  async getAnswers(questionId: string): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      where: {
        question: {
          questionId,
        },
      },
    });
    return answers;
  }
}
