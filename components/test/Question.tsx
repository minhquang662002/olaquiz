import { Question } from "@prisma/client";
import { FC } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Timer from "./Timer";
interface Props {
  question: any;
  setAnsweredList: any;
  answeredList: any;
}

const DisplayedQuestion: FC<Props> = ({
  question,
  answeredList,
  setAnsweredList,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxHeight: 600 }}>
      <Box sx={{ textAlign: "center" }}>
        <Timer type="mini" />
        {question[0]?.audio && <audio src={question[0].audio} controls />}
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {question[0]?.paragraph && (
          <Typography>{question[0].paragraph}</Typography>
        )}
        {question[0]?.image && (
          <Image
            src={question[0].image}
            alt="question_img"
            width={100}
            height={100}
          />
        )}

        {question.map((item: any, index: number) => {
          return (
            <FormControl key={index} sx={{ display: "block" }}>
              <FormLabel>
                {item.STT}.{item?.question}
              </FormLabel>
              <RadioGroup
                value={answeredList.get(item.STT) || null}
                onChange={(e) =>
                  setAnsweredList(
                    (prev: any) =>
                      new Map([...prev, [item.STT, e.target.value]])
                  )
                }
              >
                <FormControlLabel
                  value="A"
                  control={<Radio />}
                  label={`(A) ${item.option_1}`}
                />
                <FormControlLabel
                  value="B"
                  control={<Radio />}
                  label={`(B) ${item.option_2}`}
                />
                <FormControlLabel
                  value="C"
                  control={<Radio />}
                  label={`(C) ${item.option_3}`}
                />
                {item?.option_4 && (
                  <FormControlLabel
                    value="D"
                    control={<Radio />}
                    label={`(D) ${item.option_4}`}
                  />
                )}
              </RadioGroup>
            </FormControl>
          );
        })}
      </Box>
    </Box>
  );
};

export default DisplayedQuestion;
