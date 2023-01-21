import { Answer, Question } from "@prisma/client";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { submitTest } from "../../utils/fns";

export interface StudyContext {
  displayedNumber: number;
  answeredList: Map<number, string>;
  isSubmitted: boolean;
  start: boolean;
  questions: Question[];
  score: number;
  selectedQuestion: Question[];
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
  setAnsweredList: Dispatch<SetStateAction<Map<number, string>>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
  handleSubmit: () => Promise<void>;
}

const TestContext = createContext<StudyContext | null>(null);

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

  const selectedQuestion = useMemo(() => {
    return questions[displayedNumber]?.group
      ? questions.filter((cur: Question) => {
          if (cur.group === questions[displayedNumber]?.group) {
            return cur;
          }
        })
      : [questions[displayedNumber]];
  }, [displayedNumber, questions]);

  const RESULT = useMemo(
    () =>
      Array.from(answeredList.keys()).reduce((prev: number, cur: any) => {
        prev += answeredList.get(cur) === questions[cur - 1].answer ? 5 : 0;
        return prev;
      }, 0),
    [questions, answeredList]
  );

  const handleSubmit = useCallback(async () => {
    await submitTest(
      RESULT,
      session.data?.user.id as string,
      router.query.testId as string,
      answeredList
    );
    setScore(RESULT);
    setIsSubmitted(true);
    setStart(false);
  }, [
    RESULT,
    answeredList,
    router.query.testId,
    session.data?.user.id,
    setScore,
    setIsSubmitted,
    setStart,
  ]);

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
        selectedQuestion,
        handleSubmit,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export { TestContextProvider, TestContext };
