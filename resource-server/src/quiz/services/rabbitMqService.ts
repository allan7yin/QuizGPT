import amqp, { Message, MessageProperties } from "amqplib";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto";
import { getQuizRepository } from "../repositories/quizRepository";
import { Repository } from "typeorm";
import { Quiz } from "../entities/quiz";
import { Question } from "../entities/question";
import dotenv from "dotenv";
import { Option } from "../entities/option";
import { Answer } from "../entities/answer";

dotenv.config();

export class RabbitmqService {
  channel!: amqp.Channel;
  quizRepository!: Repository<Quiz>;

  setup = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    this.channel = await connection.createChannel();
    this.quizRepository = getQuizRepository();
  };

  publishMessage = async (message: CreateQuizRequestDto): Promise<string> => {
    if (!this.channel) {
      await this.setup();
    }
    await this.channel.assertExchange(
      process.env.rabbitmq_gpt_exchange!,
      "direct",
      {
        durable: true,
      }
    );

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

    this.channel.publish(
      process.env.rabbitmq_gpt_exchange!,
      process.env.gpt_request_rabbitmq_routing_key!,
      messageBuffer,
      messageProperties
    );

    return correlationId;
  };

  consumeGptRequestMessageFromMq = async (): Promise<void> => {
    if (!this.channel) {
      await this.setup();
    }

    await this.channel.assertExchange(
      process.env.rabbitmq_gpt_exchange!,
      "direct",
      {
        durable: true,
      }
    );

    const queueNames = [
      process.env.to_gpt_rabbitmq_request_queue,
      process.env.to_gateway_gpt_rabbitmq_response_queue,
    ];

    for (const queueName of queueNames) {
      await this.channel.assertQueue(queueName!, { durable: true });
    }

    this.channel.consume(
      process.env.to_gateway_gpt_rabbitmq_response_queue!,
      (data) => {
        if (data) {
          this.channel.ack(data);
          this.save(data);
        }
      }
    );
  };

  save = async (incomingMessage: any): Promise<void> => {
    try {
      const quizRepository = getQuizRepository();
      const message: Message = incomingMessage as Message;
      const messageString: string = message.content.toString("utf-8");

      const dataObject = JSON.parse(messageString);
      const quiz = new Quiz();
      quiz.quizId = dataObject.id;
      quiz.title = dataObject.title;
      quiz.questions = [];

      for (let q of dataObject.questions) {
        const question = new Question();
        question.options = [];
        question.answers = [];

        for (let op of q.options) {
          const option = new Option();
          option.content = op;
          question.options.push(option);
        }

        for (let a of q.answers) {
          const answer = new Answer();
          answer.content = a;
          question.answers.push(answer);
        }

        question.text = q.text;
        console.log(question);
        quiz.questions.push(question);
      }
      await quizRepository.save(quiz);
    } catch (error) {
      console.log(error);
    }
  };
}
