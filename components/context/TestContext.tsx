import { Answer, Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  FC,
  useMemo,
  useCallback,
} from "react";
import { submitTest } from "../../utils/fns";
import { useRouter } from "next/router";
export interface StudyContext {
  displayedNumber: number;
  answeredList: Map<number, string>;
  isSubmitted: boolean;
  start: boolean;
  questions: Question[];
  score: number;
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
  setAnsweredList: Dispatch<SetStateAction<Map<number, string>>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
  handleSubmitTest: (time: number) => void;
}

const TestContext = createContext<StudyContext>({
  displayedNumber: 0,
  setDisplayedNumber: () => {},
  answeredList: new Map(),
  isSubmitted: false,
  setIsSubmitted: () => {},
  score: 0,
  setScore: () => {},
  start: false,
  setStart: () => {},
  questions: [],
  setAnsweredList: function (value: SetStateAction<Map<number, string>>): void {
    throw new Error("Function not implemented.");
  },
  handleSubmitTest: () => {},
});

const TestContextProvider: FC<{
  children: React.ReactNode;
  result?: any;
  questions: any;
}> = ({ children, result, questions }) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [answeredList, setAnsweredList] = useState(
    !result
      ? new Map()
      : new Map(
          result?.answer?.map((item: Answer) => [item.number, item.answer])
        )
  );
  const [isSubmitted, setIsSubmitted] = useState(!!result);
  const [score, setScore] = useState(result?.score);
  const [start, setStart] = useState(false);

  const session = useSession();
  const router = useRouter();

  const RESULT = useMemo(
    () =>
      Array.from(answeredList.keys()).reduce((prev: number, cur: any) => {
        prev += answeredList.get(cur) === questions[cur - 1].answer ? 5 : 0;
        return prev;
      }, 0),
    [questions, answeredList]
  );

  const handleSubmitTest = useCallback(
    async (time: number) => {
      setStart(false);
      await submitTest(
        RESULT,
        session.data?.user.id as string,
        router.query.testId as string,
        answeredList,
        time
      );

      setScore(RESULT);
      setIsSubmitted(true);
    },
    [RESULT, answeredList, router.query.testId, session.data?.user.id]
  );

  return (
    <TestContext.Provider
      value={{
        displayedNumber,
        answeredList,
        isSubmitted,
        score,
        start,
        setDisplayedNumber,
        setAnsweredList,
        setIsSubmitted,
        setScore,
        setStart,
        questions,
        handleSubmitTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export { TestContextProvider, TestContext };
