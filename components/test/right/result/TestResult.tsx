import { FC } from "react";
import { Box } from "@mui/material";
import TestResultScore from "./TestResultScore";
import TestResultAnswer from "./TestResultAnswer";

const Result: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TestResultScore />
      <TestResultAnswer />
    </Box>
  );
};

export default Result;
