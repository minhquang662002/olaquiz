import { Question } from "@prisma/client";
import { FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import startImg from "../../asset/practice-in-progress.svg";

interface Props {
  question: (Question & { STT: number })[];
  setAnsweredList: Dispatch<SetStateAction<Map<number, Question>>>;
  answeredList: Map<number, Question>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  isSubmitted: boolean;
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
}

const DisplayedQuestion: FC<Props> = ({
  question,
  answeredList,
  setAnsweredList,
  start,
  setStart,
}) => {
  return (
    <>
      {!start ? (
        <Box sx={{ textAlign: "center" }}>
          <Image src={startImg} alt="start_img" width={500} height={400} />
          <Box
            sx={{
              width: 150,
              padding: 1,
              border: "2px solid #007AFF",
              borderRadius: 99,
              fontSize: 14,
              fontWeight: "bolder",
              textAlign: "center",
              margin: "4px auto",
              color: "#007AFF",
              cursor: "pointer",
            }}
            onClick={() => setStart(true)}
          >
            TAKE TEST
          </Box>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {question[0]?.paragraph && (
            <Typography>{question[0].paragraph}</Typography>
          )}
          {question[0]?.image && (
            <Box style={{ textAlign: "center" }}>
              <Image
                src={question[0].image}
                alt="question_img"
                width={300}
                height={200}
              />
            </Box>
          )}

          {question.map((item: Question & { STT: number }, index: number) => {
            return (
              <FormControl key={index} sx={{ display: "block" }}>
                <FormLabel>
                  {item.STT}.{item.question}
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
                  {["A", "B", "C"].map((option: string, index) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={`(${option}) ${
                        item[
                          `option_${index + 1}` as keyof (Question & {
                            STT: number;
                          })
                        ]
                      }`}
                    />
                  ))}
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
      )}
    </>
  );
};

export default DisplayedQuestion;
