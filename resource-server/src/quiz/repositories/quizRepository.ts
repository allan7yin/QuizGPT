import { Repository } from "typeorm";
import dataSource from "../../../config/ormconfig";
import { Quiz } from "../entities/quiz";

export const getQuizRepository = (): Repository<Quiz> => {
  return dataSource.getRepository(Quiz);
};
