import { FC, Fragment, useContext } from "react";
import { Question } from "@prisma/client";
import TestResultQuestion from "./TestResultQuestion";
import { Paper, Typography } from "@mui/material";
import { TestContext } from "../../../context/TestContext";

const TestResultAnswer: FC = () => {
  const { questions, answeredList } = useContext(TestContext);
  return (
    <Paper
      sx={{
        borderRadius: 2,
        paddingX: 5,
        paddingY: 3,
      }}
    >
      {questions.map((question: Question) => (
        <Fragment key={question.id}>
          {question.group &&
            question.group != questions[(question.STT as number) - 2].group && (
              <div>Question {question.group}</div>
            )}
          <TestResultQuestion
            questions={questions}
            question={question}
            answeredList={answeredList}
          />
          {question.explaination &&
            question.group &&
            !questions[(question.STT as number) - 2]?.explaination && (
              <>
                <br />
                <Paper
                  sx={{
                    fontSize: 16,
                    whiteSpace: "pre-wrap",
                    padding: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Explaination:
                  </Typography>
                  {question.explaination}
                </Paper>
                <br />
              </>
            )}
        </Fragment>
      ))}
    </Paper>
  );
};

export default TestResultAnswer;
