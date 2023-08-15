export class RabbitMqService {
  public async SendLoginRequestDto(
    loginRequestMessage: LoginRequestDto
  ): Promise<string> {
    return this.SendMessageToQueue(
      process.env.gpt_request_rabbitmq_routing_key,
      loginRequestMessage
    );
  }
}
