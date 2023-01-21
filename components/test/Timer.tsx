import {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  memo,
} from "react";
import { Typography } from "@mui/material";
import { StudyContext, TestContext } from "../context/TestContext";

const Timer: FC<any> = () => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const studyContext = useContext<StudyContext | null>(TestContext);
  const timerRef = useRef<any>();
  const timeChange = useCallback(() => {
    if (seconds != 0) {
      setSeconds((state) => state - 1);
    } else {
      if (minutes != 0) {
        setMinutes((state) => state - 1);
        setSeconds(59);
      } else {
        if (hours != 0) {
          setMinutes(59);
          setSeconds(59);
          setHours((state) => state - 1);
        } else {
          studyContext?.handleSubmit();
        }
      }
    }
  }, [hours, minutes, seconds, setHours, setMinutes, setSeconds, studyContext]);

  useEffect(() => {
    if (studyContext?.start) {
      timerRef.current = setInterval(() => {
        timeChange();
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timeChange, studyContext?.start]);

  return (
    <Typography sx={{ color: "#26C048", fontWeight: "bold" }}>
      0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Typography>
  );
};

export default memo(Timer);
