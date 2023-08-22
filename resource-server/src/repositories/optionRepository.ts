import { Repository } from "typeorm";
import dataSource from "../../config/ormconfig.js";
import { Option } from "../entities/option.js";

export const getOptionRepository = (): Repository<Option> => {
  return dataSource.getRepository(Option);
};
