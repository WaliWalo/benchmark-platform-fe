import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getResult, postAnswer } from "../../api/api";

export default function Questions(props) {
  const [exam, setExam] = useState({});
  const [counter, setCounter] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    const fetch = async () => {
      return await fetchExam(id);
    };
    fetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(decreaseTimer);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const decreaseTimer = (timer) => {
    if (timer === 0) {
      const answer = { question: counter, answer: -1 };
      postAns(answer);
      let newCounter = counter + 1;
      if (newCounter === exam.questions.length) {
        return props.history.push(`/result/${exam._id}`);
      }
      setCounter(newCounter);
      setTimer(exam.questions[counter + 1].duration);
    } else {
      return timer - 1;
    }
  };

  const postAns = async (answer) => {
    await postAnswer(id, answer);
  };

  const fetchExam = async () => {
    const result = await getResult(id);
    setExam(result, () => console.log("STATE ADDED"));
    setTimer(result.questions[counter].duration);
    setLoading(false);
  };

  const submitAnswer = async (e) => {
    console.log(e.target.value);
    const answer = { question: counter, answer: parseInt(e.target.value) };
    await postAnswer(id, answer);
    let newCounter = counter + 1;
    if (newCounter === exam.questions.length) {
      return props.history.push(`/result/${exam._id}`);
    }
    setCounter(newCounter);
    setTimer(exam.questions[counter + 1].duration);
  };

  return (
    <Container className="mt-5">
      <Card>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <ProgressBar
              now={100 / (exam.questions.length - counter)}
              label={`${100 / (exam.questions.length - counter)}%`}
              srOnly
            />
            <h1 style={{ textAlign: "center" }}>{timer}</h1>
            <Card.Header as="h5">{exam.questions[counter].text}</Card.Header>
            <Card.Body>
              <Row xs={1} md={2} style={{ textAlign: "center" }}>
                {exam.questions[counter].answers.map((answer, index) => (
                  <Col className="mt-3" key={index}>
                    <Button
                      value={index}
                      style={{ width: "20rem" }}
                      onClick={submitAnswer}
                    >
                      {answer.text}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </>
        )}
      </Card>
    </Container>
  );
}
