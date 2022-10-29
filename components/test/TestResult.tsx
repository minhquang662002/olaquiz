import { FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  Box,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { Question } from "@prisma/client";
import TestResultScore from "./TestResultScore";
import TestResultAnswer from "./TestResultAnswer";

interface Props {
  questions: Question[];
  answeredList: Map<number, string>;
  result: number;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setAnsweredList: Dispatch<SetStateAction<Map<number, string>>>;
}

const Result: FC<Props> = ({
  questions,
  answeredList,
  result,
  setIsSubmitted,
  setAnsweredList,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TestResultScore
        result={result}
        setIsSubmitted={setIsSubmitted}
        setAnsweredList={setAnsweredList}
        total={questions.length}
      />
      <TestResultAnswer questions={questions} answeredList={answeredList} />
    </Box>
  );
};

export default Result;
