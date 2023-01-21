import { Box } from "@mui/material";

const PracticeResult = ({ questions, answeredList }) => {
  const totalCorrect = Array.from(answeredList).filter(
    ([key, value]) => questions[key - 1]?.answer == value
  ).length;
  const totalIncorrect = Array.from(answeredList).filter(
    ([key, value]) => questions[key - 1]?.answer != value
  ).length;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          fontSize: 13,
          alignItems: "center",
          gap: 1,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: "green",
            borderRadius: 2,
          }}
        />
        <b>{totalCorrect}/20 Correct</b>
      </Box>
      <Box
        sx={{
          display: "flex",
          fontSize: 13,
          alignItems: "center",
          gap: 1,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: "red",
            borderRadius: 2,
          }}
        />
        <b>{totalIncorrect}/ 20 Incorrect</b>
      </Box>
    </Box>
  );
};

export default PracticeResult;
