import { Message, MessageProperties } from "amqplib";
import dotenv from "dotenv";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto";
import { channel } from "../../rabbitmq/rabbitMqConfig";
import { getQuizRepository } from "../repositories/quizRepository";
import { Quiz } from "../entities/quiz";
import { Question } from "../entities/question";

dotenv.config;

export class RabbitMqService {
  quizRepository = getQuizRepository();

  sendMessageToGptQueue = async (
    message: CreateQuizRequestDto
  ): Promise<string> => {
    const outputMessage: string = JSON.stringify(message);
    const correlationId: string = message.id;
    const messageProperties: MessageProperties = {
      contentType: "text/plain",
      contentEncoding: "utf-8",
      headers: {
        customHeader: "value",
      },
      deliveryMode: undefined,
      priority: undefined,
      replyTo: undefined,
      expiration: undefined,
      messageId: undefined,
      timestamp: undefined,
      type: undefined,
      userId: undefined,
      appId: undefined,
      clusterId: undefined,
      correlationId: correlationId,
    };

    const messageBuffer = Buffer.from(outputMessage);

    channel.publish(
      process.env.rabbitmq_gpt_exchange!,
      process.env.gpt_request_rabbitmq_routing_key!,
      messageBuffer,
      messageProperties
    );

    return correlationId;
  };

  consumeGptRequestMessageFromMq = async (): Promise<void> => {
    try {
      channel.consume(
        process.env.to_gateway_gpt_rabbitmq_response_queue!,
        (data) => {
          if (data) {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
            this.save(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  save = async (incomingMessage: any): Promise<void> => {
    try {
      const message: Message = incomingMessage as Message;
      const id: string = message.properties.correlationId;

      const messageString: string = message.content.toString("utf-8");
      console.log(JSON);

      const questions: Question[] = JSON.parse(messageString);

      await this.quizRepository.save(new Quiz(id, questions, []));
    } catch (error) {
      console.log(error);
    }
  };
}
