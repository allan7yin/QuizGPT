// Declare the types for your environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
      rabbitmq_auth_login_queue_routing_key: string;
      rabbitmq_auth_signup_queue_routing_key: string;
      to_gateway_login_response_queue_routing_key: string;
      to_gateway_sign_up_response_queue_routing_key: string;
      gpt_request_rabbitmq_routing_key: string;
      gpt_response_rabbitmq_routing_key: string;
      to_gpt_rabbitmq_request_queue: string;
      to_auth_rabbitmq_request_queue_login: string;
      to_auth_rabbitmq_request_queue_sign_up: string;
      to_gateway_gpt_rabbitmq_response_queue: string;
      to_gateway_login_response_queue: string;
      to_gateway_sign_up_response_queue: string;
      rabbitmq_gpt_exchange: string;
      rabbitmq_auth_exchange: string;
      form_management_rabbitmq_sender: string;
    }
  }
}

export {};
