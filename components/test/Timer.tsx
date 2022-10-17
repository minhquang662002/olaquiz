import { FC, useState, useEffect } from "react";

interface Props {
  type: string;
}

const Timer: FC<Props> = ({ type }) => {
  const [hours, setHours] = useState(type == "mini" ? 0 : 2);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timeChange = () => {
      if (seconds != 0) {
        setSeconds((state) => state - 1);
      } else {
        console.log("second 0");
        if (minutes != 0) {
          setMinutes((state) => state - 1);
        } else {
          setMinutes(59);
          if (hours != 0) {
            setHours((state) => state - 1);
          } else {
            alert("end");
          }
        }
        setSeconds(59);
      }
    };
    var timer: any;
    if (hours != 0 && minutes != 0 && seconds != 0) {
      timer = setInterval(() => {
        timeChange();
      }, 100);
    }

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  );
};

export default Timer;
