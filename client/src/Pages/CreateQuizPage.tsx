import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuizForm } from "../Hooks/useQuizForm";

import { ChangeEvent, SetStateAction } from "react";
import {
  Content,
  EncapsulatingContainer,
  Form,
  LeftContainer,
  RightContainer,
} from "../Styles/MaterialUIStyledComponents/CreateQuizPageComponents";

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const {
    inputTitle,
    inputNumOptions,
    inputNumQuestions,
    inputTopic,
    inputDifficulty,
    setInputNumQuestions,
    setInputDifficulty,
    setInputNumOptions,
    setInputTopic,
    setInputTitle,
  } = useQuizForm();

  const handleNumericInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setterFunction: {
      (value: SetStateAction<string>): void;
      (value: SetStateAction<string>): void;
      (arg0: any): void;
    }
  ) => {
    const input = event.target.value;

    if (/^\d*$/.test(input)) {
      setterFunction(input);
    }
  };

  const handleQuizCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    const quizData = {
      title: inputTitle,
      topic: inputTopic,
      numberOfQuestions: inputNumQuestions,
      numberOfOptionsPerQuestion: inputNumOptions,
      difficulty: inputDifficulty,
    };

    try {
      console.log("1");
      const response = await fetch("http://localhost:8080/api/v1/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(quizData),
      });

      console.log("2");

      if (response.ok) {
        const quiz = await response.json();
        console.log(quiz);
        const quizId = quiz.quizId;
        console.log(quizId);
        navigate(`/quiz/${quizId}`, { state: quiz });
      } else {
        console.log("Something went wrong ...");
      }
    } catch (error) {
      console.error("Create Quiz Request failed:", error);
    }
  };

  return (
    <>
      <EncapsulatingContainer>
        <LeftContainer>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            fontSize="50px"
            fontWeight="lighter"
            gutterBottom
          >
            Create Quiz
          </Typography>
          <Form onSubmit={handleQuizCreate}>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              color="primary"
              fullWidth
              margin="normal"
              value={inputTitle}
              onChange={(event) => setInputTitle(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Topic"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputTopic}
              onChange={(event) => setInputTopic(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Number of Questions"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputNumQuestions}
              onChange={(e) =>
                handleNumericInputChange(e, setInputNumQuestions)
              }
              inputProps={{
                pattern: "[0-9]*", // Use a pattern to allow only digits
              }}
            />
            <TextField
              id="filled-basic"
              label="Number of Options"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputNumOptions}
              onChange={(e) => handleNumericInputChange(e, setInputNumOptions)}
              inputProps={{
                pattern: "[0-9]*", // Use a pattern to allow only digits
              }}
            />
            <TextField
              id="filled-basic"
              label="Difficulty"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputDifficulty}
              onChange={(e) => setInputDifficulty(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                margin: "5%",
              }}
            >
              Submit
            </Button>
          </Form>
        </LeftContainer>
        <RightContainer>
          <Content></Content>
        </RightContainer>
      </EncapsulatingContainer>
    </>
  );
};

export default CreateQuizPage;
