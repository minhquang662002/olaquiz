import { FC, useContext } from "react";
import { Box } from "@mui/material";
import Timer from "../Timer";
import DisplayedQuestion from "./question/DisplayedQuestion";
import TestResultScore from "./result/TestResultScore";
import TestResultAnswer from "./result/TestResultAnswer";
import { TestContext } from "../../context/TestContext";

const TestDisplayRight: FC = () => {
  const {
    answeredList,
    setAnsweredList,
    questions,
    setIsSubmitted,
    setScore,
    isSubmitted,
    score,
  } = useContext(TestContext);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Timer />
      </Box>
      {isSubmitted ? (
        <>
          <TestResultScore
            total={questions?.length || 100}
            setIsSubmitted={setIsSubmitted}
            setAnsweredList={setAnsweredList}
            setScore={setScore}
            score={score}
          />

          <TestResultAnswer questions={questions} answeredList={answeredList} />
        </>
      ) : (
        <DisplayedQuestion />
      )}
    </>
  );
};

export default TestDisplayRight;
