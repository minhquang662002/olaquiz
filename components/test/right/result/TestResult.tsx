import { FC } from "react";
import TestResultScore from "./TestResultScore";
import TestResultAnswer from "./TestResultAnswer";

const Result: FC = () => {
  return (
    <>
      <TestResultScore />

      <TestResultAnswer />
    </>
  );
};

export default Result;
