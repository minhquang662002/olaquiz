import { useContext } from "react";
import { Box } from "@mui/material";
import Timer from "../Timer";
import DisplayedQuestion from "./question/DisplayedQuestion";
import TestResult from "./result/TestResult";
import { TestContext } from "../../context/TestContext";

const TestDisplayRight = () => {
  const { isSubmitted } = useContext(TestContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <Timer />
      </Box>
      {isSubmitted ? <TestResult /> : <DisplayedQuestion />}
    </Box>
  );
};

export default TestDisplayRight;
