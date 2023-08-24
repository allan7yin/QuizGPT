import { plainToInstance } from "class-transformer";
import { Option } from "../entities/option.js";
import client from "../redis/redisConfig.js";
import { getOptionRepository } from "../repositories/optionRepository.js";

export class OptionService {
  optionRepository = getOptionRepository();

  async getAnswers(questionId: string): Promise<Option[]> {
    const questionOptionsListKey = `${questionId}:options`;
    const optionsList = await client.lRange(questionOptionsListKey, 0, -1);
    console.log(optionsList);
    let options: Option[] = [];

    if (optionsList != null) {
      for (let item in optionsList) {
        const optionPlain = JSON.parse(item);
        const option = plainToInstance(Option, optionPlain);
        options.push(option);
      }
    } else {
      options = await this.optionRepository.find({
        where: {
          question: {
            questionId,
          },
        },
      });
    }

    return options;
  }
}
