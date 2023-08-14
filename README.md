## QuizGPT

This is a multiple choice quiz generation app. By entering a "topc", "number of questions", "number of options per question", and "difficulty". The application uses that to create a prompt, which is then used to query the chatgpt language model via OpenAI's API. This repository contains 3 microservices:
* Gateway: the first one that interacts with the front-end. Depending on whether a createQuiz requet has beebn made, or authentication/account related request has been made, will direct the request to on of the other 2 services. This is developed as a `SpringBoot application`. 
* AccountManagement: this service processes user authentication and account creation. Need to have an account in order to create quizes, make attempts of the quiz, and save those. This is developed as a `SpringBoot application`.
* GptService: this service takes the createQuizDto request object, and generates a quiz through OpenAI's API. This quiz is then serialized, and returned to the Gateway application. This is develoepd as a `Flask application`. 

Quiz and user data is saved in `PostgreSQL` database. In addition, RabbitMQ message broker is used, declaring 2 exchanges (authentication and gpt) and 6 queues (2 ways for login, signup, and gpt, each). 

In Development:
* Website (React.js)
* iOS app (Swift, SwiftUI)

---
### Prerequisites
* Sign up for [OpenAI](https://openai.com) and get your secret key. This is rotated periodically so needs to be updated. It is recommended to use a Python Virtual Environment.
* Have Java (ver. 17) and Python >= 3.8 installed on your computer. 
* Install [RabbitMQ](https://www.rabbitmq.com). Or (the prefered way), user the official RabbitMQ docker image:
  * `docker pull rabbitmq`
  * `docker pull rabbitmq:3.9-management` (management provides browser gui to see queues, channels, exchanges, etc.)

---
### How to run 
This will be detailed for all 3 microservices:

#### GptService
1. Enter Python Vritual Environment (Example shown below, e.g open a terminal in the project root directory and run):
```
$ virtualenv env
```
2. Then enter the virtual environment:
```
$ source env/bin/activate
```
3. Then install the dependencies:
```
$ (env) pip install -r requirements.txt
```
4. Finally start the web server:
```
$ (env) flask run
```

This server will start on port 5000 by default. You can change this in `app.py` by changing the following line to this:

```python
if __name__ == "__main__":
    app.run(debug=True, port=<desired port>)
```

Before running, you will need to enter the following into your `.env.` file:
* OpenAI API secret key 
* RabbitMQ username and password (default ones are already in repo `.env` file. Change if yours are different. 
* RabbitMQ port (the one in repo is default one)

---
#### Gateway 
1. As this is a Maven project, do:
```
mvn clean install
mvn spring-boot:run
```
Inside of the `applications.yml` and `application.properties`, adjust any information necessary (RabbitMQ username, password, port, etc.) 

This is connected to a `PostgreSQL` database. Start your database server before starting this application. By default, it is running on port 5234, change if needed. 

This server will start on port 8080 by default. There is an optional docker file included, if you would like to setup RabbitMQ via `docker-compose`. 

---

#### AccountManagement

1. As this is a Maven project, do:
```
mvn clean install
mvn spring-boot:run
```
Inside of the `applications.yml` and `application.properties`, adjust any information necessary (RabbitMQ username, password, port, etc.) 

This is connected to a `PostgreSQL` database. Start your database server before starting this application. By default, it is running on port 5234, change if needed. Also, a JWT used for authentication filter chain. Please provide a JWT for this, inside of `applications.properties`.

This server will start on port 8081 by default.

---
#### Design Diagrams (UML + ER Diagram)
![Quiz-1](https://github.com/allan7yin/QuizGenerationApp/assets/66652405/1f4c60da-43af-4f73-a269-24daf5fe1584)


