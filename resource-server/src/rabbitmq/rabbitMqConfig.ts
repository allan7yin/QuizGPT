import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

export var connection: amqp.Connection;
export var channel: amqp.Channel;

const rabbitMqConfig = async () => {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    const queueNames = [
      process.env.to_gpt_rabbitmq_request_queue,
      process.env.to_gateway_gpt_rabbitmq_response_queue,
    ];

    for (const queueName of queueNames) {
      await channel.assertQueue(queueName!, { durable: true });
    }

    await channel.bindQueue(
      process.env.to_gpt_rabbitmq_request_queue!,
      process.env.rabbitmq_gpt_exchange!,
      process.env.gpt_request_rabbitmq_routing_key!
    );

    await channel.bindQueue(
      process.env.to_gateway_gpt_rabbitmq_response_queue!,
      process.env.rabbitmq_gpt_exchange!,
      process.env.gpt_response_rabbitmq_routing_key!
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { rabbitMqConfig };
