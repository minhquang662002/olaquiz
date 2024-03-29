import { FC, memo } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { TimerContext } from "../../../context/TimerContext";
import { useRouter } from "next/router";

const TestResultScore: FC<any> = ({
  setIsSubmitted,
  setAnsweredList,
  setScore,
  score,
  total,
}) => {
  const { setHours, setMinutes, setSeconds } = useContext(TimerContext);
  const router = useRouter();
  const restart = () => {
    setIsSubmitted(false);
    setAnsweredList(new Map());
    setScore(0);
    setHours(router.query.testType == "mini-test" ? 1 : 2);
    setMinutes(0);
    setSeconds(0);
  };
  return (
    <Paper
      sx={{
        borderRadius: 2,
        marginBottom: 2,
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="body2" fontWeight="bolder" marginBottom={2}>
        TỔNG ĐIỂM:
      </Typography>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress
            variant="determinate"
            sx={{ color: "#F0F0F0", position: "absolute", top: 0, left: 0 }}
            value={100}
            size={150}
          />
          <CircularProgress
            variant="determinate"
            sx={{ color: "#19CE7A" }}
            value={score / ((total * 5) / 100)}
            size={150}
          />
        </Box>

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" sx={{ color: "#19CE7A" }}>
            {score}
          </Typography>
        </Box>
      </Box>
      <Button
        className="prev__question-btn"
        sx={{
          display: "block",
          margin: "20px auto",
          fontWeight: "bolder",
          width: 150,
          padding: "5px",
        }}
        onClick={restart}
      >
        LÀM LẠI
      </Button>
    </Paper>
  );
};

export default memo(TestResultScore);
