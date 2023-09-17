# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

ENV PORT=5000

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World
# ENV OPENAI_API_KEY
ENV RABBITMQ_USER guest
ENV RABBITMQ_PASSWORD guest
ENV RABBITMQ_HOST rabbitmq # Use the service name defined in Docker Compose
ENV RABBITMQ_PORT 5672
ENV ENVIRONMENT mock

ENV REQUEST_QUEUE to_gpt_request_queue
ENV RESPONSE_QUEUE to_gateway_gpt_response_queue

ENV GPT_EXCHANGE gpt_exchange
ENV GPT_TO_GATEWAY_ROUTING_KEY gpt_response_routing_key


# Run app.py when the container launches
CMD ["flask", "run"]
