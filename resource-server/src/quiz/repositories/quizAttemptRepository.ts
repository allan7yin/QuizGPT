import { Repository } from "typeorm";
import { dataSource } from "../../../config/ormconfig.js";
import { QuizAttempt } from "../entities/quizAttempt.js";

export const getQuizAttemptRepository = (): Repository<QuizAttempt> => {
  return dataSource.getRepository(QuizAttempt);
};
