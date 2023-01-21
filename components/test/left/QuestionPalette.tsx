import { FC, useState, useContext } from "react";
import { Question } from "@prisma/client";
import { Box, Typography, Paper, Button } from "@mui/material";
import { ChevronLeft, ChevronRight, RestartAlt } from "@mui/icons-material";
import TestProgress from "../LinearProgress";
import { GlobalContext } from "../../context/GlobalContext";
import QuestionPaletteButton from "./QuestionPaletteButton";
import { TestContext } from "../../context/TestContext";
import PracticeResult from "../../exercise/PracticeResult";

const QuestionPalette: FC<{ type: string }> = ({ type }) => {
  const [page, setPage] = useState(0);
  const { setIsLoading } = useContext(GlobalContext);
  const studyContext = useContext(TestContext);

  const submit = async () => {
    setIsLoading(true);
    await studyContext?.handleSubmit();
    setIsLoading(false);
  };

  const restart = () => {
    studyContext?.setAnsweredList(new Map());
  };

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        alignSelf: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Typography>Question Palette</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ChevronLeft
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (page > 0) {
                setPage((state) => state - 1);
              }
            }}
          />
          <ChevronRight
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (
                (page + 1) * 24 <
                (studyContext?.questions?.length as number)
              ) {
                setPage((state) => state + 1);
              }
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 30px)",
          gridTemplateRows: "repeat(3, 30px)",
          gap: 1,
        }}
      >
        {studyContext?.questions
          ?.slice(page * 24, (page + 1) * 24)
          .map((item: Question) => (
            <QuestionPaletteButton
              key={item.id}
              isSubmitted={studyContext.isSubmitted}
              answeredList={studyContext.answeredList}
              displayedNumber={studyContext.displayedNumber}
              item={item}
              questions={studyContext.questions}
              setDisplayedNumber={studyContext.setDisplayedNumber}
              type={type}
            />
          ))}
      </Box>
      <br />
      {type == "test" ? (
        <>
          <TestProgress
            value={studyContext?.answeredList.size || 0}
            total={studyContext?.questions.length || 0}
          />
          {studyContext?.start && !studyContext.isSubmitted && (
            <Button
              sx={{
                background: "#E4E6ED",
                color: "black",
                borderRadius: 999,
                display: "block",
                width: 100,
                fontWeight: "bolder",
                fontSize: 13,
                padding: "4px 0",
                marginLeft: "auto",
                marginTop: "10px",
                cursor: "pointer",
                textTransform: "none",
              }}
              onClick={submit}
            >
              Nộp bài
            </Button>
          )}
        </>
      ) : (
        <>
          <PracticeResult
            questions={studyContext?.questions}
            answeredList={studyContext?.answeredList}
          />
          <Button
            sx={{
              display: "flex",
              border: "1px solid #007AFF",
              width: 80,
              padding: "4px 3px",
              borderRadius: 99,
              color: "#007AFF",
              alignItems: "center",
              gap: 0.2,
              marginLeft: "auto",
              cursor: "pointer",
              justifyContent: "center",
            }}
            onClick={restart}
          >
            <RestartAlt style={{ fontSize: 15 }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: "bolder",
                textTransform: "none",
              }}
            >
              Làm lại
            </span>
          </Button>
        </>
      )}
    </Paper>
  );
};

export default QuestionPalette;
