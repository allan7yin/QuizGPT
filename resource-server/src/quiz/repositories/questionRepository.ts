import { Repository } from "typeorm";
import dataSource from "../../../config/ormconfig";
import { Question } from "../entities/question";

export const getQuestionRepository = (): Repository<Question> => {
  return dataSource.getRepository(Question);
};
