import { Box, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { memo, FC, Dispatch, SetStateAction } from "react";
import { Question } from "@prisma/client";

interface Props {
  start: boolean;
  displayedNumber: number;
  questions: Question[];
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
}

const DisplayedQuestionButtonGroup: FC<Props> = ({
  start,
  displayedNumber,
  questions,
  setDisplayedNumber,
}) => {
  return (
    <>
      {start && (
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
    </>
  );
};

export default memo(DisplayedQuestionButtonGroup);
