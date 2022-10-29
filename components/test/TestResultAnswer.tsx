import { FC } from "react";
import { Question } from "@prisma/client";
import TestResultQuestion from "./TestResultQuestion";
import Paper from "@mui/material/Paper";

interface Props {
  questions: Question[];
  answeredList: Map<number, string>;
}

const TestResultAnswer: FC<Props> = ({ questions, answeredList }) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        paddingX: 5,
        paddingY: 3,
      }}
    >
      {questions.map((question: Question, qsIndex: number) => (
        <TestResultQuestion
          key={qsIndex}
          qsIndex={qsIndex}
          question={question}
          answeredList={answeredList}
        />
      ))}
    </Paper>
  );
};

export default TestResultAnswer;
