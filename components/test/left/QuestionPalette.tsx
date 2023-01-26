import { FC, useState, useContext, memo } from "react";
import { Question } from "@prisma/client";
import { Box, Typography, Paper, Button } from "@mui/material";
import { ChevronLeft, ChevronRight, RestartAlt } from "@mui/icons-material";
import TestProgress from "../LinearProgress";
import { GlobalContext } from "../../context/GlobalContext";
import QuestionPaletteButton from "./QuestionPaletteButton";
import { TestContext } from "../../context/TestContext";
import PracticeResult from "../../exercise/PracticeResult";
import { TimerContext } from "../../context/TimerContext";

const QuestionPalette: FC<{ type: string }> = ({ type }) => {
  const [page, setPage] = useState(0);
  const { setIsLoading } = useContext(GlobalContext);
  const {
    questions,
    setAnsweredList,
    isSubmitted,
    answeredList,
    displayedNumber,
    setDisplayedNumber,
    start,
    handleSubmitTest,
  } = useContext(TestContext);

  const restart = () => {
    setAnsweredList(new Map());
  };
  const { hours, minutes, seconds } = useContext(TimerContext);

  const submit = async () => {
    setIsLoading(true);

    await handleSubmitTest(hours * 3600 + minutes * 60 + seconds);
    setIsLoading(false);
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
        <Typography variant="body2" fontWeight="bolder">
          Bảng Câu Hỏi
        </Typography>
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
              if ((page + 1) * 24 < (questions?.length as number)) {
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
        {questions?.slice(page * 24, (page + 1) * 24).map((item: Question) => (
          <QuestionPaletteButton
            key={item.id}
            isSubmitted={isSubmitted}
            answeredList={answeredList}
            displayedNumber={displayedNumber}
            item={item}
            questions={questions}
            setDisplayedNumber={setDisplayedNumber}
            type={type}
          />
        ))}
      </Box>
      <br />
      {type == "test" ? (
        <>
          <TestProgress
            value={answeredList.size || 0}
            total={questions.length || 0}
          />
          {start && !isSubmitted && (
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
          <PracticeResult questions={questions} answeredList={answeredList} />
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

export default memo(QuestionPalette);
