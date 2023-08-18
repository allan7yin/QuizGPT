// Declare the types for your environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
      gpt_request_rabbitmq_routing_key: string;
      gpt_response_rabbitmq_routing_key: string;
      to_gpt_rabbitmq_request_queue: string;
      to_gateway_gpt_rabbitmq_response_queue: string;
      rabbitmq_gpt_exchange: string;
      DB_PORT: string;
      DB_HOST: string;
      DB_USERNAME: string;
      DB_DATABASE: string;
      REDIS_QUIZID_SET: string;
      RABBITMQ_SERVER: string;
      AUTH0_AUDIENCE: string;
      AUTH0_ISSUER: string;
    }
  }
}

export {};
