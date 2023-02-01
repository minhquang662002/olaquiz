import { FC, Fragment, memo } from "react";
import { Question } from "@prisma/client";
import dynamic from "next/dynamic";
import { Paper, Typography } from "@mui/material";
import TestResultQuestion from "./TestResultQuestion";

const TestResultAnswer: FC<any> = ({ questions, answeredList }) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        paddingX: {
          md: 5,
          xs: 1,
        },
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

export default memo(TestResultAnswer);
