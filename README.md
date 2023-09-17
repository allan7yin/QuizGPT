# QuizGPT

**Note:** To view legacy code (written in SpringBoot), refer to old [server](https://github.com/allan7yin/ResourceServer) and [authentication server](https://github.com/allan7yin/AccountMicroservice)

### System Diagram
![IMG_5CA1904774EE-1](https://github.com/allan7yin/QuizGPT/assets/66652405/5b9273be-56b1-4ad7-b2bf-587660b2e258)

----

### Description
This application is called QuizGPT. It is an application that generates multiple choice quizzes for the user based on inputs the user provides, such as "topic", "difficulty", and "number of questions". The application uses that to create a prompt, which is then used to query the chatgpt language model via OpenAI's API. This repository contains 3 microservices:
* Client: the front end facing micro-service that the user interacts with. Here, the user can create an account, create quizzes, take those quizzes, re-take those quizzes, etc. All authentication related requests use `Auth0`'s identity service to sercure user management. In addition, `Oauth` workflows are possible, allowing user to login via third-party accounts. This micro-service was developed as a `ReactJS` project using `Typescript`. 2 versions of this were created: **(1)** for using `REST API`, **(2)** for using `Apollo` and `GrpahQL`
* Server: the back end micro-service that deals with managing basic user data as well as all managed all quizzes. This service, in the REST version, made use of `Redis` in memory database as a cache. This allowed recently accessed quizzes, questions, or answers to be quickly accessed within a certain time-frame of the last database retrieval. In the `GraphQL` version, caching was done via Apollo in the client-side rather than server. `GraphQL` schemas were defined for the client and server to communicate. Quizzes were saved in a `PostgreSQL` database and persisted via `TypeORM`. 
* questionGPT: the last service was used to quuery OpenAI's API with a prompt to generate the desired quiz. Once the quiz was generated, it would then be serialized, and returned to the server.

Between the **Server** and `questionGPT`, `RabbitMQ` was used a message broker to facilitate communication. 

----

### Prerequisities 
* Sign up for OpenAI and get your secret key. This is rotated periodically so needs to be updated. It is recommended to use a Python Virtual Environment.
* Have Node version >= 18
* Install RabbitMQ. Or (the prefered way), use the official RabbitMQ docker image [here](https://hub.docker.com/_/rabbitmq)
* Install RedisStack. Or (the prefered way), use the official RabbitMQ docker image [here](https://hub.docker.com/r/redis/redis-stack)

----

### How to Run 
This will be detailed for all 3 microservices 

**Server **
1. Install the dependencies
```
npm i 
```
2. Run Server -- make sure Redis, RabbitMQ, and PostgreSQL are running
```
npm run start
```

For the above service, please fill in the needed sections in the `.env`. file. 

**questionGPT**
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
```
if __name__ == "__main__":
    app.run(debug=True, port=<desired port>)
```

Before running, you will need to enter the following into your `.env` file:
* OpenAI API secret key
* RabbitMQ username and password (default ones are already in repo .env file. Change if yours are different.
* RabbitMQ port (the one in repo is default one)

**Client**
1. Install the dependencies
```
npm i 
```
2. Run Server
```
npm run start
```












