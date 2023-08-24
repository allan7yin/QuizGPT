import json
import os
import threading
import logging

from flask import Flask
import pika
from utils import generate_prompt, MOCK_PROMPT
import openai

app = Flask(__name__)
env = os.getenv("ENVIRONMENT")

# Set the logging level to DEBUG
app.logger.setLevel(logging.DEBUG)

# Add a handler to display logs in the terminal
handler = logging.StreamHandler()
app.logger.addHandler(handler)

# RabbitMQ singleton channel
global global_rabbitmq_channel
global_rabbitmq_channel = None

# some configuration data we will keep here
rabbitmq_user = os.getenv("RABBITMQ_USER")
rabbitmq_password = os.getenv("RABBITMQ_PASSWORD")
rabbitmq_host = os.getenv("RABBITMQ_HOST")
rabbitmq_port = int(os.getenv("RABBITMQ_PORT"))

request_queue = os.getenv("REQUEST_QUEUE")
response_queue = os.getenv("RESPONSE_QUEUE")

gpt_exchnage = os.getenv("GPT_EXCHANGE")

gpt_routing_key = os.getenv("GPT_TO_GATEWAY_ROUTING_KEY")

openai.api_key = os.getenv("OPENAI_API_KEY")


class QuestionDto:
    def __init__(self):
        self.content = None
        self.options = []
        self.answers = []


class OptionDto:
    def __init__(self):
        self.content = None


class AnswerDto:
    def __init__(self):
        self.content = None


def parse_response(text):  # need numOptions to know how many to parse into
    questions = text.split("\n\n")
    quiz = []

# ['', 'Question 1: What is the result of 75 + 16?', 'A: 91', 'B: 81', 'C: 89', 'D: 71', 'Answer: A'], the first one has extra space in it, remeber
    for question in questions:
        # for each question, parse and place into an object
        parsed_response = question.split("\n")

        entry = QuestionDto()
        if parsed_response[0] == '':
            parsed_response = parsed_response[1:]

        for index in range(len(parsed_response)):
            if index == 0:
                # question
                entry.content = parsed_response[index]
            elif index == len(parsed_response) - 1:
                # last one, this is the answer
                entry.answers = [parsed_response[index]]
            else:
                # this means we are on an option
                entry.options.append(parsed_response[index])

        quiz.append(entry)

    return quiz


def chatgpt_request(topic, numQuestions, numOptions, difficulty):
    if env == "mock":
        # response = openai.Completion.create(
        # model="text-davinci-003",
        # # prompt=generate_prompt(topic, numQuestions, numOptions, difficulty),
        # prompt=MOCK_PROMPT,
        # temperature=0.8,
        # max_tokens=1000
        # )
        response = {
            "choices": [
                {
                    "finish_reason": "stop",
                    "index": 0,
                    "logprobs": None,
                    "text": "\nQuestion 1: What is the result of 75 + 16?\nA: 91\nB: 81\nC: 89\nD: 71\nAnswer: A\n\nQuestion 2: What is the result of 67 + 97?\nA: 154\nB: 164\nC: 174\nD: 144\nAnswer: B\n\nQuestion 3: What is the result of 57 + 37?\nA: 94\nB: 76\nC: 84\nD: 92\nAnswer: A\n\nQuestion 4: What is the result of 16 + 17?\nA: 33\nB: 31\nC: 37\nD: 34\nAnswer: A\n\nQuestion 5: What is the result of 73 + 97?\nA: 170\nB: 160\nC: 150\nD: 180\nAnswer: A"
                }
            ],
            "created": 1686432460,
            "id": "cmpl-7Q0PUWmJZqoKTVr2Q4M5VSXkFBNKh",
            "model": "text-davinci-003",
            "object": "text_completion",
            "usage": {
                "completion_tokens": 169,
                "prompt_tokens": 166,
                "total_tokens": 335
            }
        }
    else:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(topic, numQuestions,
                                   numOptions, difficulty),
            temperature=0.8,
            max_tokens=1000
        )

    app.logger.info(response)
    return response


def callback(ch, method, properties, body):  # called when message from queue has been consumed
    try:
        message = json.loads(body)  # get python object from the json
        # this JSON will be in the format of CreateQuizRequestDto.java -> id, topic, num questions, number of options, difficulty.
        app.logger.info(message)
        quiz_id = message["id"]
        topic = message["topic"]
        title = message["title"]
        numQuestions = message["numberOfQuestions"]
        numOptions = message["numberOfOptionsPerQuestion"]
        difficulty = message["difficulty"]

        generated_text = chatgpt_request(
            topic, numQuestions, numOptions, difficulty)
        if generated_text is None:
            app.logger.error("Error generating text.")
            return
        text = generated_text["choices"][0]["text"]
        formatted_quiz_dto = parse_response(text)
        # quizDto is what is being returned

        data = [question.__dict__ for question in formatted_quiz_dto]
        response_data = {
            "id": quiz_id,
            "title": title,
            "questions": data
        }

        json_data = json.dumps(response_data)
        app.logger.info("Reponse Message: " + json_data)

        ch.basic_publish(exchange=gpt_exchnage,
                         routing_key=gpt_routing_key, body=json_data)
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as exception:
        app.logger.error(exception)


def connect_to_rabbitmq_server():
    global global_rabbitmq_channel

    credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=rabbitmq_host, port=rabbitmq_port, credentials=credentials))
    app.logger.info(f"Successfully connected to RabbitMQ at {rabbitmq_host}") if connection.is_open else app.logger.info(
        f"Failed to connect to RabbitMQ at {rabbitmq_host}")

    # create a channel
    global_rabbitmq_channel = connection.channel()
    # declare the queues (which have also been declared on the other end)
    app.logger.info(request_queue)
    app.logger.info(response_queue)
    global_rabbitmq_channel.queue_declare(queue=request_queue, durable=True)
    global_rabbitmq_channel.queue_declare(queue=response_queue, durable=True)


def start_consuming():
    try:
        # establish connection to RabbitMQ channel,
        global global_rabbitmq_channel
        connect_to_rabbitmq_server()
        if global_rabbitmq_channel is None:
            app.logger("Error connecting to input queue. Exiting...")
            return "Error: Failed to connect to RabbitMQ"
        else:
            app.logger.info("Successfully connected to RabbitMQ")

        # indicates that the channel will only prefetch and process one message at a time before waiting for an acknowledgment.
        global_rabbitmq_channel.basic_qos(prefetch_count=1)
        # callback function called when message is consumed
        global_rabbitmq_channel.basic_consume(
            queue=request_queue, on_message_callback=callback)
        global_rabbitmq_channel.start_consuming()
    except Exception as exception:
        app.logger.error(exception)


@app.route("/")
def home():
    return "<h1>Question GPT Service is now running.</h1>"
    app.logger.info("started flask application - quizgpt service")

# complete this one time, first time app is started
# THIS HAS BEEN DEPRACATED
# @app.before_first_request
# def startup():
#     app.logger.info('Starting RabbitMQ thread')
#     rabbitmq_thread = threading.Thread(target=start_consuming)
#     rabbitmq_thread.start()


print('Starting Flask app. Environment: ', env)
print('Starting RabbitMQ thread')
app.logger.info('Logging test')
rabbitmq_thread = threading.Thread(target=start_consuming)
rabbitmq_thread.start()
if __name__ == "__main__":
    app.logger.info('Starting Flask app. Environment: ' + env)
    if env == "dev" or env == "mock":
        app.logger.info("In dev environment.")
        app.run(port=5000)
