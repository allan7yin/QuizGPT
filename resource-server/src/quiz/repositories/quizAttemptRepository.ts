import { Repository } from "typeorm";
import dataSource from "../../../config/ormconfig";
import { QuizAttempt } from "../entities/quizAttempt";

export const getQuizAttemptRepository = (): Repository<QuizAttempt> => {
  return dataSource.getRepository(QuizAttempt);
};
