import { FC, useState, createContext } from "react";

interface ITimerState {
  hours: number;
  minutes: number;
  seconds: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

import { useRouter } from "next/router";
import { number } from "yup/lib/locale";
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
  const [hours, setHours] = useState(
    result
      ? Math.floor(result.remainTime / 3600)
      : router.query.testType == "mini-test"
      ? 1
      : 2
  );
  const [minutes, setMinutes] = useState(
    result ? Math.floor((result.remainTime - hours * 3600) / 60) : 0
  );
  const [seconds, setSeconds] = useState(
    result ? Math.floor(result.remainTime - hours * 3600 - minutes * 60) : 0
  );
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
