import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "unsplash-js";
import BasicModal from "../Components/Modal";
import { Quiz } from "../Interfaces/QuizInterface";

const unsplash = createApi({
  accessKey: "U02Os41iR5j0Dqdvx5pY9bOEz8gjCubjq6b5x8mvsZE",
});

const QuizzesPage: FC = () => {
  const navigate = useNavigate();
  const [deletionTarget, setDeletionTarget] = useState<Quiz>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleCreateQuiz = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    e.preventDefault();
    navigate("/createQuiz");
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/v1/quizzes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQuizzes(data);
      } else {
        console.log("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async () => {
    const quizId = deletionTarget?.quizId;
    console.log(quizId);
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/quiz/${quizId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Deleted quiz");
        setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
      } else {
        console.log("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleViewQuiz = async (quiz: Quiz) => {
    navigate(`/quiz/${quiz.quizId}`, { state: quiz });
  };

  return (
    <>
      <main>
        <div>
          <Container maxWidth="sm" style={{ marginTop: "3%" }}>
            {" "}
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              fontSize="2.7vw;"
              fontWeight="lighter"
              gutterBottom
            >
              My Quizzes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Here, you can access all your past quizzes, retake them, or delete
              them
            </Typography>
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateQuiz}
                  >
                    + Create a Quiz
                  </Button>
                </Grid>

                <Grid item>
                  <Button variant="contained" color="primary">
                    Export all Quizzes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        {quizzes.length > 0 ? (
          <Container
            maxWidth="md"
            sx={{
              padding: "20px 0",
            }}
          >
            <Grid container spacing={4}>
              {quizzes.map((quiz, index) => (
                <Grid item key={quiz.quizId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      image="https://source.unsplash.com/rMmibFe4czY"
                      title={quiz.title}
                      sx={{
                        paddingTop: "56.25%",
                      }}
                    />{" "}
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {quiz.title}
                      </Typography>
                      <Typography>Quiz #{index + 1}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleViewQuiz(quiz);
                        }}
                      >
                        {" "}
                        View{" "}
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log(quiz);
                          setConfirmModalOpen(true);
                          setDeletionTarget(quiz);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </Button>

                      {isConfirmModalOpen && (
                        <BasicModal
                          open={isConfirmModalOpen}
                          onClose={() => setConfirmModalOpen(false)}
                          modalTitle="Confirmation"
                          modalMessage="are you sure you want to delete this quiz with id"
                          handleConfirm={() => {
                            console.log(deletionTarget);
                            handleDelete();
                            setConfirmModalOpen(false);
                          }}
                        />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <p></p>
        )}
      </main>
    </>
  );
};

export default QuizzesPage;
