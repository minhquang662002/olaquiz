import { FC, Fragment, useState } from "react";
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import Image from "next/image";
import { Question } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface Props {
  questions: Question[];
  question: Question;
  answeredList: Map<number, string>;
}

const TestResultQuestion: FC<Props> = ({
  questions,
  question,
  answeredList,
}) => {
  const [isShowExplain, setIsShowExplain] = useState(true);

  return (
    <>
      <FormGroup>
        {!question.group && (
          <Typography sx={{ fontWeight: "bold" }}>
            Câu hỏi {question.STT}:
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
          <Box
            sx={{
              marginY: 2,
              padding: 2,
              background: "#F6F6FA",
              whiteSpace: "pre-wrap",
              fontSize: 13,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            {question.paragraph}
          </Box>
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
          <Typography sx={{ fontWeight: "bold" }}>
            Câu hỏi {question.STT}. {question?.question}
          </Typography>
        )}
        {["A", "B", "C", "D"].map((item: string, index: number) => {
          return (
            question[`option_${index + 1}` as keyof Question] && (
              <Fragment key={`${question.id}${item}`}>
                <FormControlLabel
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
                    answeredList.get(question.STT as number) == item
                  }
                  sx={{
                    "&:hover": {
                      background: "#ececec",
                    },
                    margin: 0,
                    borderRadius: 2,
                    background:
                      answeredList.get(question.STT as number) == item
                        ? "#ececec"
                        : "",
                  }}
                  label={question[`option_${index + 1}` as keyof Question]}
                />
                {item == question.answer &&
                  question.explaination &&
                  (question.group
                    ? questions[(question.STT as number) - 2].explaination
                    : true) && (
                    <>
                      <Button
                        sx={{
                          textTransform: "none",
                          maxWidth: 150,
                          fontSize: 12,
                          fontWeight: "bolder",
                        }}
                        onClick={() => setIsShowExplain((state) => !state)}
                      >
                        {isShowExplain ? "Ẩn giải thích" : "Hiện giải thích"}
                      </Button>
                      <Divider />
                      {isShowExplain && (
                        <>
                          <br />
                          <Box
                            sx={{
                              color: "#666666",
                              fontSize: 15,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {question.explaination}
                          </Box>
                          <br />
                        </>
                      )}
                    </>
                  )}
              </Fragment>
            )
          );
        })}
      </FormGroup>
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
    </>
  );
};

export default TestResultQuestion;
