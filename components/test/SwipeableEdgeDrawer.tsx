import { Box, Grid, Typography, Drawer } from "@mui/material";
import React, { FC, useContext } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useState } from "react";
import { ChevronLeft, ChevronRight, RestartAlt } from "@mui/icons-material";
import QuestionPaletteButton from "./left/QuestionPaletteButton";
import { TestContext } from "../context/TestContext";
import { Exercise, Question } from "@prisma/client";
import { TimerContext } from "../context/TimerContext";
import { useRouter } from "next/router";

const SwipeableEdgeDrawer: FC<{ exercises?: Exercise[] }> = ({ exercises }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingList, setIsShowingList] = useState(false);
  const { questions, isSubmitted, answeredList, handleSubmitTest, start } =
    useContext(TestContext);
  const { hours, minutes, seconds } = useContext(TimerContext);
  const [page, setPage] = useState(0);
  const router = useRouter();

  return (
    <Box
      sx={{
        display: {
          md: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: 0,
          background: "white",
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ textAlign: "center", flexGrow: 1 }}
          onClick={() => setIsOpen((state) => !state)}
        >
          <QuestionAnswerIcon sx={{ fontSize: 15 }} />
          <Typography sx={{ fontSize: 10, background: "white" }}>
            Bảng câu hỏi
          </Typography>
        </Box>
        {router.pathname.includes("test") ? (
          <Box
            sx={{ textAlign: "center", flexGrow: 1 }}
            onClick={() => {
              if (!isSubmitted && start) {
                handleSubmitTest(hours * 3600 + minutes * 60 + seconds);
              }
            }}
          >
            <TaskAltIcon sx={{ fontSize: 15 }} />
            <Typography sx={{ fontSize: 10, background: "white" }}>
              Nộp bài
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{ textAlign: "center", flexGrow: 1 }}
              onClick={() => setIsShowingList(true)}
            >
              <ListAltIcon sx={{ fontSize: 15 }} />
              <Typography sx={{ fontSize: 10, background: "white" }}>
                Danh sách bài thi
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", flexGrow: 1 }}>
              <RestartAlt sx={{ fontSize: 15 }} />
              <Typography sx={{ fontSize: 10, background: "white" }}>
                Làm lại
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: {
            md: "none",
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
          <ChevronLeft
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
            onClick={() => {
              if (page > 0) {
                setPage((state) => state - 1);
              }
            }}
          />
          <ChevronRight
            sx={{
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 6px rgb(0 0 0 / 10%)",
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
            onClick={() => {
              if ((page + 1) * 24 < (questions?.length as number)) {
                setPage((state) => state + 1);
              }
            }}
          />
        </Box>
        <Grid
          container
          sx={{
            gap: 1,
            background: "white",
            justifyContent: "center",
            marginTop: 1,
            paddingBottom: 2,
          }}
        >
          {questions
            ?.slice(page * 20, (page + 1) * 20)
            .map((item: Question) => (
              <Grid item key={item.id} xs={2} sx={{ flexGrow: 1 }}>
                <QuestionPaletteButton
                  isSubmitted={isSubmitted}
                  answeredList={answeredList}
                  item={item}
                  type="test"
                  questions={questions}
                />
              </Grid>
            ))}
        </Grid>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={isShowingList}
        onClose={() => setIsShowingList(false)}
        sx={{
          display: {
            md: "none",
          },
        }}
      >
        <Grid
          container
          sx={{
            gap: 1,
            background: "white",
            marginTop: 1,
            paddingBottom: 2,
            justifyContent: "center",
          }}
        >
          {exercises?.map((item: Exercise, index) => (
            <Grid
              key={item.id}
              xs={4}
              sx={{
                flexGrow: 1,
                width: "100%",
                borderRadius: 2,
                background: !router.query.exercise
                  ? index == 0
                    ? "white"
                    : "#E4E6ED"
                  : router.query.exercise == item.id
                  ? "white"
                  : "#E4E6ED",
                whiteSpace: "nowrap",

                border: !router.query.exercise
                  ? index == 0
                    ? "2px solid #007AFF"
                    : ""
                  : router.query.exercise == item.id
                  ? "2px solid #007AFF"
                  : "",
                cursor: "pointer",
                color: !router.query.exercise
                  ? index == 0
                    ? "#007AFF"
                    : "#B2B6C3"
                  : router.query.exercise == item.id
                  ? "#007AFF"
                  : "#B2B6C3",
                fontSize: 14,
                fontWeight: "bolder",
                textAlign: "center",
                padding: "3px",
              }}
              item
              onClick={() =>
                router.push(
                  `/practice/${router.query.practiceType}/${router.query.practiceTopic}/${item.id}`
                )
              }
            >
              {item.name.split("-").join(" ")}
            </Grid>
          ))}
        </Grid>
      </Drawer>
    </Box>
  );
};

export default SwipeableEdgeDrawer;
