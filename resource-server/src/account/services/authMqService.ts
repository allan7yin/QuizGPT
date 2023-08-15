import { MqResponse } from "../entities/mqResponse";
import { MqResponseRepository } from "../repositories/mqResponseRepository";
import { channel } from "../../rabbitmq/rabbitMqConfig";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import { Message, MessageProperties } from "amqplib";

import { LoginRequestDto } from "../dtos/loginRequestDto";
import { SignUpRequestDto } from "../dtos/signUpRequestDto";

dotenv.config();

export class AuthMqService {
  mqResponseRepository: any;
  constructor() {
    this.mqResponseRepository = MqResponseRepository; // Assuming it's already initialized
  }

  public async SendLoginRequestDto(
    loginRequestMessage: LoginRequestDto
  ): Promise<string> {
    return this.SendMessageToQueue(
      process.env.rabbitmq_auth_login_queue_routing_key,
      loginRequestMessage
    );
  }

  public async SendSignUpRequestDto(
    signUpRequestMessage: SignUpRequestDto
  ): Promise<string> {
    return this.SendMessageToQueue(
      process.env.rabbitmq_auth_signup_queue_routing_key,
      signUpRequestMessage
    );
  }

  // public async ConsumeLoginMessageFromMQ(): Promise<void> {
  //   try {
  //     channel.consume(process.env.to_gateway_login_response_queue, (data) => {
  //       if (data) {
  //         console.log(`${Buffer.from(data.content)}`);
  //         channel.ack(data);
  //         this.save(data);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async ConsumeSignUpMessageFromMQ(): Promise<void> {
  //   try {
  //     channel.consume(process.env.to_gateway_sign_up_response_queue, (data) => {
  //       if (data) {
  //         console.log(`${Buffer.from(data.content)}`);
  //         channel.ack(data);
  //         this.save(data);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  private async save(incomingMessage: any): Promise<void> {
    try {
      const message: Message = incomingMessage as Message;
      const correlationID: string = message.properties.correlationId;

      const JSON: string = message.content.toString("utf-8");
      console.log(JSON);

      await this.mqResponseRepository.save(new MqResponse(correlationID, JSON));
    } catch (error) {
      console.log(error);
    }
  }

  private async SendMessageToQueue<T>(
    routingKey: string,
    message: T
  ): Promise<string> {
    try {
      const outputMessage: string = JSON.stringify(message);
      const correlationId: string = uuidv4();
      const messageProperties: MessageProperties = {
        contentType: "text/plain",
        contentEncoding: "utf-8",
        headers: {
          customHeader: "value",
        },
        correlationId: correlationId,
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
      };

      const messageBuffer = Buffer.from(outputMessage);

      await channel.publish(
        process.env.rabbitmq_auth_exchange,
        routingKey,
        messageBuffer,
        messageProperties
      );

      return correlationId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async isEntryExistsByCorrelationId(
    correlationId: string
  ): Promise<boolean> {
    try {
      return await this.mqResponseRepository.existsByCorrelationId(
        correlationId
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = { AuthMqService };
