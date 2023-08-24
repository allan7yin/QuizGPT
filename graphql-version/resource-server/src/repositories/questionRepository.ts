import { Repository } from "typeorm";
import dataSource from "../../config/ormconfig.js";
import { Question } from "../entities/question.js";

export const getQuestionRepository = (): Repository<Question> => {
  return dataSource.getRepository(Question);
};
