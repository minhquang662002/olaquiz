import { FC, Fragment, useContext } from "react";
import { Question } from "@prisma/client";
import TestResultQuestion from "./TestResultQuestion";
import { Paper, Typography } from "@mui/material";
import { TestContext } from "../../../context/TestContext";

interface Props {
  questions: Question[];
  answeredList: Map<number, string>;
}

const TestResultAnswer: FC<any> = () => {
  const studyContext = useContext(TestContext);
  return (
    <Paper
      sx={{
        borderRadius: 2,
        paddingX: 5,
        paddingY: 3,
      }}
    >
      {studyContext?.questions.map((question: Question) => (
        <Fragment key={question.id}>
          {question.group &&
            question.group !=
              studyContext.questions[(question.STT as number) - 2].group && (
              <div>Question {question.group}</div>
            )}
          <TestResultQuestion
            questions={studyContext.questions}
            question={question}
            answeredList={studyContext.answeredList}
          />
          {question.explaination &&
            question.group &&
            !studyContext.questions[(question.STT as number) - 2]
              ?.explaination && (
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
