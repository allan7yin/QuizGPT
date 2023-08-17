import { Repository } from "typeorm";
import { dataSource } from "../../../config/ormconfig.js";
import { Quiz } from "../entities/quiz.js";

export const getQuizRepository = (): Repository<Quiz> => {
  return dataSource.getRepository(Quiz);
};
