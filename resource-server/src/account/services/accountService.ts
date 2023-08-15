import { MqResponseRepository } from "../repositories/mqResponseRepository";
import { MqResponse } from "../entities/mqResponse";

export class AccountService {
  mqResponseRepository: any;
  constructor() {
    this.mqResponseRepository = MqResponseRepository; // Assuming it's already initialized
  }

  FindMqResponseByCorrelationId = (correlationId: string): MqResponse => {
    const response = this.mqResponseRepository.findById(correlationId);

    if (response) {
      return response;
    } else {
      throw new Error(`error: mq with id ${correlationId} not found`);
    }
  };

  FindFirstMqResponse = (correlationIdOrUsername: string): MqResponse => {
    const response = this.mqResponseRepository.findFirstByResponseContaining(
      correlationIdOrUsername
    );

    if (response) {
      return response;
    } else {
      throw new Error(
        `${correlationIdOrUsername} not found. Continuing to look ...`
      );
    }
  };

  MqDelete = async (response: MqResponse): Promise<void> => {
    this.mqResponseRepository.delete(response);
  };

  FindFirstByResponseContaining = (username: string): MqResponse | null => {
    const optionalMqResponse =
      this.mqResponseRepository.findFirstByResponseContaining(username);

    if (optionalMqResponse) {
      return optionalMqResponse;
    } else {
      return null;
    }
  };
}
