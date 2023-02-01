import { Box } from "@mui/material";

interface Props {
  questions: any;
  answeredList?: Map<number, string>;
}

const PracticeResult: React.FC<Props> = ({ questions, answeredList }) => {
  const totalCorrect = answeredList
    ? Array.from(answeredList).filter(
        ([key, value]) => questions[key - 1]?.answer == value
      ).length
    : 0;
  const totalIncorrect = answeredList
    ? Array.from(answeredList).filter(
        ([key, value]) => questions[key - 1]?.answer != value
      ).length
    : 0;

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
        <b>
          {totalCorrect}/{questions.length} Correct
        </b>
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
        <b>
          {totalIncorrect}/ {questions.length} Incorrect
        </b>
      </Box>
    </Box>
  );
};

export default PracticeResult;
