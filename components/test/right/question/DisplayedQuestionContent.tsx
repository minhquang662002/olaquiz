import { Question } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import startImg from "../../../../asset/practice-in-progress.svg";
import QuestionOptionGroup from "./DisplayedQuestionOptionGroup";

interface Props {
  question: Question[];
  answeredList: Map<number, string>;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setAnsweredList: React.Dispatch<React.SetStateAction<Map<number, string>>>;
  type?: string;
}

const DisplayedQuestionContent: FC<Props> = ({
  question,
  answeredList,
  setAnsweredList,
  start,
  setStart,
  type,
}) => {
  return (
    <>
      {!start && type != "exercise" ? (
        <>
          <Box
            sx={{
              textAlign: "center",
              position: "relative",
              height: { xs: 200, md: 400 },
            }}
          >
            <Image src={startImg} alt="start_img" fill={true} sizes="100%" />
          </Box>
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
        </>
      ) : (
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {question[0]?.paragraph && (
            <div
              dangerouslySetInnerHTML={{ __html: question[0].paragraph }}
              style={{ margin: "5px 0" }}
            />
          )}
          {question[0]?.image && (
            <Box style={{ textAlign: "center" }}>
              <Image
                src={question[0].image}
                alt="question_img"
                width={300}
                height={200}
                sizes="100%"
              />
            </Box>
          )}

          {question.map((item: Question) => {
            return (
              <QuestionOptionGroup
                key={item?.id}
                item={item}
                setAnsweredList={setAnsweredList}
                answeredList={answeredList}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default DisplayedQuestionContent;
