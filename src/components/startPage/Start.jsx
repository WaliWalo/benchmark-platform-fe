import React, { useState } from "react";
import { Container, Form, Jumbotron, Button, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import { postExam } from "../../api/api";
export default function Start(props) {
  const springProp = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [exam, setExam] = useState({
    candidateName: "",
    name: "",
    options: "Number of Questions",
    optionSelected: 5,
  });

  const fillForm = (e) => {
    let currentId = e.currentTarget.id;
    let newExam = { ...exam };
    newExam[currentId] = e.currentTarget.value;
    setExam(newExam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { candidateName: exam.candidateName, name: exam.name };
    const result = await postExam(data, exam.options, exam.optionSelected);
    console.log(result);
    if (!result.candidateName) {
      alert("Something went wrong, please reload");
    } else {
      props.history.push(`/questions/${result._id}`);
    }
  };

  return (
    <Container>
      <animated.div style={springProp}>
        <Jumbotron fluid>
          <Container>
            <h1>WELCOME TO YOUR BENCHMARK PLATFORM</h1>
            <p>
              Enter your name and name of exam, number of questions and duration
              is optional, if none only 5 questions will be supplied
            </p>
          </Container>
        </Jumbotron>
      </animated.div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Candidate Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            required
            id="candidateName"
            value={exam.candidateName}
            onChange={fillForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Exam Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Exam Name"
            required
            id="name"
            value={exam.name}
            onChange={fillForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Control
                as="select"
                id="options"
                onChange={fillForm}
                value={exam.options}
              >
                <option>Number of Questions</option>
                <option>Duration</option>
              </Form.Control>
            </Col>
            <Col>
              {exam.options === "Number of Questions" ? (
                <Form.Control
                  type="number"
                  id="optionSelected"
                  onChange={fillForm}
                  value={exam.optionSelected}
                />
              ) : (
                <Form.Control
                  type="time"
                  id="optionSelected"
                  onChange={fillForm}
                  value={exam.optionSelected}
                />
              )}
            </Col>
          </Form.Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
