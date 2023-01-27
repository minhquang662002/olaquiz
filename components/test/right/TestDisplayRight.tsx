import { FC, useContext } from "react";
import { Box } from "@mui/material";
import Timer from "../Timer";
import DisplayedQuestion from "./question/DisplayedQuestion";
import TestResultScore from "./result/TestResultScore";
import TestResultAnswer from "./result/TestResultAnswer";
import { TestContext } from "../../context/TestContext";

const TestDisplayRight: FC<{ isSubmitted: boolean }> = ({ isSubmitted }) => {
  const {
    answeredList,
    setAnsweredList,
    questions,
    setIsSubmitted,
    setScore,
    score,
    start,
    setStart,
    displayedNumber,
    setDisplayedNumber,
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
          />

          <TestResultAnswer questions={questions} answeredList={answeredList} />
        </>
      ) : (
        <DisplayedQuestion
          start={start}
          setStart={setStart}
          displayedNumber={displayedNumber}
          answeredList={answeredList}
          setAnsweredList={setAnsweredList}
          questions={questions}
          setDisplayedNumber={setDisplayedNumber}
        />
      )}
    </>
  );
};

export default TestDisplayRight;
