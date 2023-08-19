import { Repository } from "typeorm";
import dataSource from "../../config/ormconfig.js";
import { User } from "../entities/user.js";

export const getUserRepository = (): Repository<User> => {
  return dataSource.getRepository(User);
};
