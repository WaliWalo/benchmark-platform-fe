import React, { useEffect, useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getResult } from "../../api/api";
// import { useTransition, animated } from "react-spring";
import "./styles.css";

// const pages = [
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightpink" }}>
//       Afdafd
//     </animated.div>
//   ),
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
//   ),
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightgreen" }}>
//       C
//     </animated.div>
//   ),
// ];

export default function Result(props) {
  const [exam, setExam] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  //styles
  //   const [index, set] = useState(0);
  //   const onClick = useCallback(() => set((state) => (state + 1) % 3), []);
  //   const transitions = useTransition(index, (p) => p, {
  //     from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  //     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  //     leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  //   });

  useEffect(() => {
    const fetch = async () => {
      return await fetchExam(id);
    };
    fetch();
  }, []);

  const fetchExam = async () => {
    const result = await getResult(id);
    setExam(result);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <Jumbotron fluid>
            <Container>
              <h1>{exam.candidateName}</h1>
              <h2>{exam.name}</h2>
              <p>
                {exam.examDate.slice(0, 10)} at {exam.examDate.slice(11, 16)}
              </p>
              <p>
                {exam.score} out of {exam.questions.length}
              </p>
              <Button onClick={() => props.history.push("/")}>
                Do another test
              </Button>
            </Container>
          </Jumbotron>

          {/* <div className="simple-trans-main" onClick={onClick}>
            {transitions.map(({ item, props, key }) => {
              const Page = pages[item];
              return <Page key={key} style={props} />;
            })}
          </div> */}
        </div>
      )}
    </>
  );
}
