import { FC } from "react";
import QuestionPalette from "./QuestionPalette";
import { Box, Typography } from "@mui/material";
import Leaderboard from "./Leaderboard";

const TestDisplayLeft: FC<any> = (props) => {
  let { testName, ranking } = props;
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bolder",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        {testName}
      </Typography>
      <QuestionPalette type="test" />
      <Leaderboard ranking={ranking || []} />
    </Box>
  );
};

export default TestDisplayLeft;
