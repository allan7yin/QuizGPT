// import { Message } from "amqplib";
// import { Question } from "../entities/question";
// import { Quiz } from "../entities/quiz";
// import { getQuizRepository } from "../repositories/quizRepository";
// import amqp from "amqplib";

// export const consumeGptRequestMessageFromMq = async (): Promise<void> => {
//   const connection = await amqp.connect("amqp://localhost");
//   const channel = await connection.createChannel();

//   await channel.assertExchange(process.env.rabbitmq_gpt_exchange!, "direct", {
//     durable: true,
//   });

//   const queueNames = [
//     process.env.to_gpt_rabbitmq_request_queue,
//     process.env.to_gateway_gpt_rabbitmq_response_queue,
//   ];

//   for (const queueName of queueNames) {
//     await channel.assertQueue(queueName!, { durable: true });
//   }

//   channel.consume(
//     process.env.to_gateway_gpt_rabbitmq_response_queue!,
//     (data) => {
//       if (data) {
//         console.log(`${Buffer.from(data.content)}`);
//         channel.ack(data);
//         save(data);
//       }
//     }
//   );
// };

// const save = async (incomingMessage: any): Promise<void> => {
//   try {
//     const quizRepository = getQuizRepository();
//     const message: Message = incomingMessage as Message;
//     const id: string = message.properties.correlationId;

//     const messageString: string = message.content.toString("utf-8");
//     console.log(JSON);

//     const questions: Question[] = JSON.parse(messageString);

//     await quizRepository.save(new Quiz(id, questions, []));
//   } catch (error) {
//     console.log(error);
//   }
// };
