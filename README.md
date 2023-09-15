## QuizGPT

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
