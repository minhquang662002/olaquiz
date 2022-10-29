import { FC, useState, useEffect, useRef, useCallback } from "react";
import { Typography } from "@mui/material";
interface Props {
  type: string;
  start: boolean;
  setIsSubmitted: any;
}

const Timer: FC<Props> = ({ type, start, setIsSubmitted }) => {
  const [hours, setHours] = useState(type == "mini" ? 1 : 2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef<any>();
  const timeChange = useCallback(() => {
    if (seconds != 0) {
      setSeconds((state) => state - 1);
    } else {
      if (minutes != 0) {
        setMinutes((state) => state - 1);
      } else {
        setMinutes(59);
        if (hours != 0) {
          setHours((state) => state - 1);
        } else {
          setIsSubmitted(true);
        }
      }
      setSeconds(59);
    }
  }, [hours, minutes, seconds, setIsSubmitted]);

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

export default Timer;
