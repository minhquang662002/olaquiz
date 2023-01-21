import { useContext } from "react";
import { TestContext } from "../context/TestContext";
import DisplayedQuestion from "../test/right/question/DisplayedQuestion";
import TestResultQuestion from "../test/right/result/TestResultQuestion";
import { Box, Button } from "@mui/material";

const DisplayContainer = () => {
  const studyContext = useContext(TestContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {studyContext?.answeredList?.get(studyContext?.displayedNumber + 1) ? (
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
          <TestResultQuestion
            answeredList={studyContext?.answeredList}
            questions={studyContext?.questions}
            question={studyContext?.questions[studyContext?.displayedNumber]}
          />
          <Button
            className="next__question-btn"
            onClick={() =>
              studyContext?.setDisplayedNumber((state) => state + 1)
            }
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
