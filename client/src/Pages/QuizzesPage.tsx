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
import { Quiz } from "../Interfaces/QuizInterface";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // we pass the list of quizzes to thise component

const QuizzesPage: FC = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz[]>([]);

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
    console.log(accessToken);
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
        setQuiz(data);
      } else {
        console.log("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      {/* ... your other JSX ... */}
      {quiz.length > 0 ? (
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
                Here, you can access all your past quizzes, edit them, or retake
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

          <Container
            maxWidth="md"
            sx={{
              padding: "20px 0",
            }}
          >
            <Grid container spacing={4}>
              {quiz.map((question) => (
                <Grid item key={question.quizId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      image="https://source.unsplash.com/rMmibFe4czY"
                      title="Image title"
                      sx={{
                        paddingTop: "56.25%",
                      }}
                    />{" "}
                    {/* // make this from the quiz topic instead */}
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        "will replaced by quiz title"
                      </Typography>
                      <Typography>
                        Media Card content - Quiz on "topic"
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        {" "}
                        View{" "}
                      </Button>
                      <Button size="small" color="primary">
                        {" "}
                        Edit{" "}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default QuizzesPage;
