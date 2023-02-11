import { FC, useMemo } from "react";
import { useContext } from "react";
import { TestContext } from "../../context/TestContext";
import { Grid } from "@mui/material";
import { Question } from "@prisma/client";

interface Props {
  isSubmitted: boolean;
  answeredList: Map<number, string>;
  item: Question;
  type: string;
  questions: Question[];
}

const QuestionPaletteButton: FC<Props> = ({
  isSubmitted,
  answeredList,
  item,
  type,
  questions,
}) => {
  const { displayedNumber, setDisplayedNumber } = useContext(TestContext);

  const buttonStyle = useMemo(() => {
    return type == "test"
      ? `${
          !isSubmitted
            ? answeredList.get(item.STT)
              ? "#007AFF"
              : "#F2F3F7"
            : answeredList.get(item.STT)
            ? answeredList.get(item.STT) == item.answer
              ? "#4CAF50"
              : "#FF5252"
            : "#F2F3F7"
        }`
      : `${
          answeredList.get(item.STT)
            ? answeredList.get(item.STT) == item.answer
              ? "#4CAF50"
              : "#FF5252"
            : "#F2F3F7"
        }`;
  }, [answeredList, isSubmitted, item.STT, item.answer, type]);

  const handleChangeQuestion = (selectedQuestionNumber: number) => {
    if (type == "test") {
      setDisplayedNumber(selectedQuestionNumber);
    } else {
      if (answeredList.get(selectedQuestionNumber)) {
        setDisplayedNumber(selectedQuestionNumber);
      }
      if (selectedQuestionNumber == 0) {
        setDisplayedNumber(selectedQuestionNumber);
      }
    }
  };

  return (
    <Grid
      item
      md={1.7}
      style={{
        borderRadius: 3,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: buttonStyle,
        color: `${
          answeredList.get(item.STT as number)
            ? "white"
            : item.STT == questions[displayedNumber]?.STT
            ? "black"
            : "#7B7777"
        }`,
        fontWeight: "bold",
        border: `${
          item.STT == questions[displayedNumber]?.STT ||
          (questions[displayedNumber]?.group
            ? item?.group == questions[displayedNumber]?.group
            : false)
            ? "2px solid #007AFF"
            : ""
        }`,
        cursor: "pointer",
      }}
      key={item.id}
      onClick={() => handleChangeQuestion(item.STT - 1)}
    >
      {item.STT}
    </Grid>
  );
};

export default QuestionPaletteButton;
