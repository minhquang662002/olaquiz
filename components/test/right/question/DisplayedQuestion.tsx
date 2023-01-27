import { FC, useMemo } from "react";
import DisplayedQuestionButtonGroup from "./DisplayedQuestionButtonGroup";
import DisplayedQuestionContent from "./DisplayedQuestionContent";
import { Box } from "@mui/material";
import { Question } from "@prisma/client";

const DisplayedQuestion: FC<any> = ({
  type,
  start,
  setStart,
  displayedNumber,
  setDisplayedNumber,
  answeredList,
  setAnsweredList,
  isSubmitted,
  questions,
}) => {
  const selectedQuestion = useMemo(() => {
    return questions[displayedNumber]?.group
      ? questions.filter((cur: Question) => {
          if (cur.group === questions[displayedNumber]?.group) {
            return cur;
          }
        })
      : [questions[displayedNumber]];
  }, [displayedNumber, questions]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: 600,
        background: "white",
        flexGrow: 1,
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        borderRadius: 2,
        paddingX: 5,
        paddingY: 3,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {start && selectedQuestion[0]?.audio && (
          <audio
            style={{ marginTop: 2 }}
            src={selectedQuestion[0].audio}
            controls
            autoPlay
          />
        )}
      </Box>
      {type != "exercise" && (
        <DisplayedQuestionContent
          start={start}
          setStart={setStart}
          question={selectedQuestion}
          setAnsweredList={setAnsweredList}
          answeredList={answeredList}
          type={type}
        />
      )}

      {!isSubmitted && (
        <DisplayedQuestionButtonGroup
          start={start}
          displayedNumber={displayedNumber!}
          questions={questions!}
          setDisplayedNumber={setDisplayedNumber}
        />
      )}
    </Box>
  );
};

export default DisplayedQuestion;
