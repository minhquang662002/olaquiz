import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Question } from "@prisma/client";
import { FC } from "react";
interface Props {
  item: Question;
  answeredList: any;
  setAnsweredList: any;
}

const DisplayedQuestionOptionGroup: FC<Props & { type?: string }> = ({
  item,
  answeredList,
  setAnsweredList,
  type,
}) => {
  return (
    <FormControl key={item?.STT} sx={{ display: "block" }}>
      {item?.group && (
        <FormLabel sx={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
          {item.STT}.{item.question}
        </FormLabel>
      )}
      {item?.question && (
        <FormLabel sx={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
          {item?.question}
        </FormLabel>
      )}

      <RadioGroup
        value={answeredList.get(item?.STT) || null}
        onChange={(e) =>
          setAnsweredList(
            (prev: any) => new Map([...prev, [item?.STT, e.target.value]])
          )
        }
      >
        {["A", "B", "C"].map((option: string, index) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={item?.[`option_${index + 1}` as keyof Question]}
          />
        ))}
        {item?.option_4 && (
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={item?.option_4}
          />
        )}
      </RadioGroup>
    </FormControl>
  );
};

export default DisplayedQuestionOptionGroup;
