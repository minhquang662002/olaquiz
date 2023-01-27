import { FC, useEffect, useRef, useCallback, useContext, memo } from "react";
import { Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import { TimerContext } from "../context/TimerContext";
import { TestContext } from "../context/TestContext";

const Timer: FC = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const { start, handleSubmitTest } = useContext(TestContext);
  const { hours, minutes, seconds, setHours, setMinutes, setSeconds } =
    useContext(TimerContext);
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
        }
      }
    }
  }, [seconds, setSeconds, minutes, setMinutes, hours, setHours]);

  useEffect(() => {
    if (hours == 0 && minutes == 0 && seconds == 0) {
      (async () => {
        setIsLoading(true);
        await handleSubmitTest(hours * 3600 + minutes * 60 + seconds);
        setIsLoading(false);
      })();
    }
  }, [handleSubmitTest, hours, minutes, seconds, setIsLoading]);

  useEffect(() => {
    if (start) {
      timerRef.current = setInterval(() => {
        timeChange();
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timeChange, start]);

  return (
    <Typography sx={{ color: "#26C048", fontWeight: "bold" }}>
      0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Typography>
  );
};

export default memo(Timer);
