import { FC, useMemo } from "react";
import { QuestionPalleteButtonProps } from "../../../utils/types";

const QuestionPaletteButton: FC<QuestionPalleteButtonProps> = ({
  isSubmitted,
  answeredList,
  displayedNumber,
  item,
  questions,
  setDisplayedNumber,
  type,
}) => {
  const buttonStyle = useMemo(() => {
    return type == "test"
      ? `${
          !isSubmitted
            ? answeredList.get(item.STT as number)
              ? "#007AFF"
              : "#F2F3F7"
            : answeredList.get(item.STT as number)
            ? answeredList.get(item.STT as number) == item.answer
              ? "#4CAF50"
              : "#FF5252"
            : "#F2F3F7"
        }`
      : `${
          answeredList.get(item.STT as number)
            ? answeredList.get(item.STT as number) == item.answer
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
    <div
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
            : item.STT == displayedNumber + 1
            ? "black"
            : "#7B7777"
        }`,
        fontWeight: "bold",
        border: `${
          item.STT == displayedNumber + 1 ||
          (questions[displayedNumber]?.group
            ? item?.group == questions[displayedNumber]?.group
            : false)
            ? "2px solid #007AFF"
            : ""
        }`,
        cursor: "pointer",
      }}
      key={item.id}
      onClick={() => handleChangeQuestion((item.STT as number) - 1)}
    >
      {item.STT}
    </div>
  );
};

export default QuestionPaletteButton;
