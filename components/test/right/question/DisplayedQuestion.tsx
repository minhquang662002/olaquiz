import { FC, useContext } from "react";
import DisplayedQuestionButtonGroup from "./DisplayedQuestionButtonGroup";
import DisplayedQuestionContent from "./DisplayedQuestionContent";
import { Box } from "@mui/material";
import { TestContext } from "../../../context/TestContext";

const DisplayedQuestion: FC<any> = ({ type }) => {
  const studyContext = useContext(TestContext);

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
        {studyContext?.start && studyContext?.selectedQuestion[0]?.audio && (
          <audio
            style={{ marginTop: 2 }}
            src={studyContext?.selectedQuestion[0].audio}
            controls
          />
        )}
      </Box>
      {type != "exercise" && (
        <DisplayedQuestionContent
          start={studyContext?.start!}
          setStart={studyContext?.setStart!}
          question={studyContext?.selectedQuestion!}
          setAnsweredList={studyContext?.setAnsweredList!}
          answeredList={studyContext?.answeredList!}
          type={type}
        />
      )}

      {studyContext?.isSubmitted && (
        <DisplayedQuestionButtonGroup
          start={studyContext?.start}
          displayedNumber={studyContext?.displayedNumber}
          questions={studyContext?.questions}
          setDisplayedNumber={studyContext?.setDisplayedNumber!}
        />
      )}
    </Box>
  );
};

export default DisplayedQuestion;
