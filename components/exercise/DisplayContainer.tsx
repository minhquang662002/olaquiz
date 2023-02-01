import { useContext } from "react";
import { TestContext } from "../context/TestContext";
import DisplayedQuestion from "../test/right/question/DisplayedQuestion";
import TestResultQuestion from "../test/right/result/TestResultQuestion";
import { Box, Button } from "@mui/material";

const DisplayContainer = () => {
  const { answeredList, displayedNumber, questions, setDisplayedNumber } =
    useContext(TestContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {answeredList.get(displayedNumber + 1) ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            flexGrow: 1,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            borderRadius: 2,
            paddingX: 5,
            paddingY: 3,
          }}
        >
          <TestResultQuestion
            answeredList={answeredList}
            questions={questions}
            question={questions[displayedNumber]}
          />
          <Button
            className="next__question-btn"
            onClick={() => setDisplayedNumber((state) => state + 1)}
          >
            Next
          </Button>
        </Box>
      ) : (
        <DisplayedQuestion type="exercise" />
      )}
    </Box>
  );
};

export default DisplayContainer;
