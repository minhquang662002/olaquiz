import { FC, Dispatch, SetStateAction, useState, useContext } from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TestProgress from "./LinearProgress";
import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { submitTest } from "../../utils/fns";
import { GlobalContext } from "../context/GlobalContext";

interface Props {
  questions: Question[];
  answeredList: Map<number, string>;
  displayedNumber: number;
  start: boolean;
  isSubmitted: boolean;
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  result: number;
}

const QuestionPalette: FC<Props> = ({
  questions,
  answeredList,
  displayedNumber,
  start,
  isSubmitted,
  setDisplayedNumber,
  setIsSubmitted,
  result,
}) => {
  const [page, setPage] = useState(0);
  const session = useSession();
  const router = useRouter();
  const { setIsLoading } = useContext(GlobalContext);

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        alignSelf: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Typography>Question Palette</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ChevronLeftIcon
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (page > 0) {
                setPage((state) => state - 1);
              }
            }}
          />
          <ChevronRightIcon
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if ((page + 1) * 24 < questions.length) {
                setPage((state) => state + 1);
              }
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 30px)",
          gridTemplateRows: "repeat(3, 30px)",
          gap: 1,
        }}
      >
        {questions
          .slice(page * 24, (page + 1) * 24)
          .map((item: Question, index: number) => {
            return (
              <div
                style={{
                  borderRadius: 3,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${
                    answeredList.get(index + 1) ? "#007AFF" : "#F2F3F7"
                  }`,
                  color: `${
                    answeredList.get(index + 1)
                      ? "white"
                      : index + page * 24 == displayedNumber
                      ? "black"
                      : "#7B7777"
                  }`,
                  fontWeight: "bold",
                  border: `${
                    index + page * 24 == displayedNumber ||
                    (questions[displayedNumber]?.group
                      ? item?.group == questions[displayedNumber]?.group
                      : false)
                      ? "2px solid #007AFF"
                      : ""
                  }`,
                  cursor: "pointer",
                }}
                key={item.id}
                onClick={() => {
                  if (index + page * 24 != displayedNumber) {
                    setDisplayedNumber(index + page * 24);
                  }
                }}
              >
                {index + 1 + page * 24}
              </div>
            );
          })}
      </Box>
      <br />
      <TestProgress value={answeredList.size} total={questions.length} />
      {start && !isSubmitted && (
        <div
          style={{
            background: "#E4E6ED",
            color: "black",
            borderRadius: 999,
            display: "block",
            fontWeight: 900,
            fontSize: 15,
            width: 80,
            padding: 2,
            textAlign: "center",
            marginLeft: "auto",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={async () => {
            setIsLoading(true);
            await submitTest(
              result,
              session.data?.user.id as string,
              router.query.testId as string,
              answeredList
            );
            setIsLoading(false);
            setIsSubmitted(true);
          }}
        >
          Submit
        </div>
      )}
    </Paper>
  );
};

export default QuestionPalette;
