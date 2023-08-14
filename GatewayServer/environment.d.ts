// Declare the types for your environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
      rabbitmq_auth_login_queue_routing_key: string = "to_gpt_request_queue";
      rabbitmq_auth_signup_queue_routing_key: string = "to_gpt_request_queue";
      to_gateway_login_response_queue_routing_key: string = "to_gpt_request_queue";
      to_gateway_sign_up_response_queue_routing_key: string = "to_gpt_request_queue";
      gpt_request_rabbitmq_routing_key: string = "to_gpt_request_queue";
      gpt_response_rabbitmq_routing_key: string = "to_gpt_request_queue";
      to_gpt_rabbitmq_request_queue: string = "to_gpt_request_queue";
      to_auth_rabbitmq_request_queue_login: string = "to_gpt_request_queue";
      to_auth_rabbitmq_request_queue_sign_up: string = "to_gpt_request_queue";
      to_gateway_gpt_rabbitmq_response_queue: string = "to_gpt_request_queue";
      to_gateway_login_response_queue: string = "to_gpt_request_queue";
      to_gateway_sign_up_response_queue: string = "to_gpt_request_queue";
      rabbitmq_gpt_exchange: string = "to_gpt_request_queue";
      rabbitmq_auth_exchange: string = "to_gpt_request_queue";
      form_management_rabbitmq_sender: string = "to_gpt_request_queue";
    }
  }
}

export {};
