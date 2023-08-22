import { Repository } from "typeorm";
import dataSource from "../../config/ormconfig.js";
import { Answer } from "../entities/answer.js";

export const getAnswerRepository = (): Repository<Answer> => {
  return dataSource.getRepository(Answer);
};
