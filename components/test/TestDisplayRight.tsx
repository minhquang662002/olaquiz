import { FC, useMemo, Dispatch, SetStateAction } from "react";
import { Box, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Timer from "./Timer";
import DisplayedQuestion from "./DisplayedQuestion";
import { Question } from "@prisma/client";

interface Props {
  questions: Question[];
  answeredList: Map<number, Question>;
  displayedNumber: number;
  start: boolean;
  isSubmitted: boolean;
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  setAnsweredList: Dispatch<SetStateAction<Map<any, any>>>;
}

const TestDisplayRight: FC<Props> = ({
  questions,
  answeredList,
  displayedNumber,
  start,
  isSubmitted,
  setDisplayedNumber,
  setStart,
  setIsSubmitted,
  setAnsweredList,
}) => {
  const selectedQuestion = useMemo(() => {
    return questions[displayedNumber]?.group
      ? questions.reduce((prev: any, cur, index) => {
          if (cur.group === questions[displayedNumber]?.group) {
            prev.push({ ...cur, STT: index + 1 });
          }
          return prev;
        }, [])
      : [{ ...questions[displayedNumber], STT: displayedNumber + 1 }];
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
        <Timer type="mini" start={start} setIsSubmitted={setIsSubmitted} />
        {start && selectedQuestion[0]?.audio && (
          <audio
            style={{ marginTop: 2 }}
            src={selectedQuestion[0].audio}
            controls
          />
        )}
      </Box>
      <DisplayedQuestion
        start={start}
        setStart={setStart}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        question={selectedQuestion}
        setAnsweredList={setAnsweredList}
        answeredList={answeredList}
      />
      {!isSubmitted && start && (
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          {displayedNumber >= 1 && (
            <Button
              className="prev__question-btn"
              onClick={() => setDisplayedNumber((state) => state - 1)}
            >
              <ChevronLeftIcon />
              Prev
            </Button>
          )}
          {displayedNumber < questions.length - 1 && (
            <Button
              className="next__question-btn"
              onClick={() => setDisplayedNumber((state) => state + 1)}
            >
              Next
              <ChevronRightIcon />
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TestDisplayRight;
