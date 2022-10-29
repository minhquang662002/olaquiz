import { FC, useState } from "react";
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
import Image from "next/image";
import { Question } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface Props {
  question: Question;
  qsIndex: number;
  answeredList: Map<number, string>;
}

const TestResultQuestion: FC<Props> = ({ question, qsIndex, answeredList }) => {
  const [isShowExplain, setIsShowExplain] = useState(false);

  return (
    <>
      <FormGroup>
        {question.group ? (
          <Typography sx={{ fontWeight: "bold" }}>
            Question {question.group}:
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: "bold" }}>
            Question {qsIndex + 1}:
          </Typography>
        )}
        {question?.audio && (
          <audio
            style={{ margin: "10px auto" }}
            src={question.audio}
            controls
          />
        )}
        {question?.paragraph && (
          <Box sx={{ background: "gray" }}>{question.paragraph}</Box>
        )}
        {question?.image && (
          <Box style={{ textAlign: "center" }}>
            <Image
              src={question.image}
              alt="question_img"
              width={300}
              height={200}
            />
          </Box>
        )}
        {question.group && (
          <FormLabel>
            Question {qsIndex + 1}. {question?.question}
          </FormLabel>
        )}
        {["A", "B", "C", "D"].map((item: string, index: number) => {
          return (
            question[`option_${index + 1}` as keyof Question] && (
              <FormControlLabel
                key={`${question.id}${item}`}
                control={
                  <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={
                      question.answer == item ? (
                        <CircleCheckedFilled sx={{ color: "green" }} />
                      ) : (
                        <CancelRoundedIcon sx={{ color: "red" }} />
                      )
                    }
                  />
                }
                disabled
                checked={
                  question.answer == item ||
                  answeredList.get(qsIndex + 1) == item
                }
                sx={{
                  "&:hover": {
                    background: "#ececec",
                  },
                  borderRadius: 2,
                  background:
                    answeredList.get(qsIndex + 1) == item ? "#ececec" : "",
                }}
                label={`(${item}) ${
                  question[`option_${index + 1}` as keyof Question]
                }`}
              />
            )
          );
        })}

        <div style={{ whiteSpace: "pre-wrap" }}>{question.explaination}</div>
      </FormGroup>
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
    </>
  );
};

export default TestResultQuestion;
