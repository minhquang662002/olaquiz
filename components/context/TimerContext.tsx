import { FC, useState, createContext, useEffect } from "react";

interface ITimerState {
  hours: number;
  minutes: number;
  seconds: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

import { useRouter } from "next/router";
import { Result } from "@prisma/client";

const TimerContext = createContext<ITimerState>({
  hours: 1,
  minutes: 0,
  seconds: 0,
  setHours: () => {},
  setMinutes: () => {},
  setSeconds: () => {},
});

const TimerContextProvider: FC<{
  children: React.ReactNode;
  result: Result;
}> = ({ children, result }) => {
  const router = useRouter();

  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (router.query.testType == "mini-test") {
      setHours(1);
    } else {
      setHours(2);
    }
  }, [router.query.testType, setHours]);

  useEffect(() => {
    if (result) {
      setHours(Math.floor(result.remainTime / 3600));
      setMinutes(
        Math.floor(
          (result.remainTime - Math.floor(result.remainTime / 3600) * 3600) / 60
        )
      );
      setSeconds(
        Math.floor(
          result.remainTime -
            Math.floor(result.remainTime / 3600) * 3600 -
            Math.floor(
              (result.remainTime -
                Math.floor(result.remainTime / 3600) * 3600) /
                60
            ) *
              60
        )
      );
    }
  }, [result, setHours, setMinutes, setSeconds]);

  return (
    <TimerContext.Provider
      value={{
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContextProvider, TimerContext };
