import { Dispatch, SetStateAction } from "react";
import { Question, Result, User } from "@prisma/client";

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface TestDisplayRightProps {
  questions: Question[];
  answeredList: Map<number, string>;
  displayedNumber: number;
  start: boolean;
  isSubmitted: boolean;
  setDisplayedNumber: Dispatch<SetStateAction<number>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setAnsweredList: Dispatch<SetStateAction<Map<number, string>>>;
}

export interface DisplayedQuestionProps
  extends Omit<
    TestDisplayRightProps,
    | "questions"
    | "displayedNumber"
    | "setDisplayedNumber"
    | "score"
    | "setScore"
  > {
  question: Question[];
}

export interface TestDisplayLeftProps
  extends Omit<TestDisplayRightProps, "setStart" | "setAnsweredList"> {
  testName: string;
  ranking: (Result & User)[];
  setScore: Dispatch<SetStateAction<number>>;
  type?: string;
}

export interface QuestionPalleteProps
  extends Omit<TestDisplayLeftProps, "testName" | "ranking"> {
  setStart: Dispatch<SetStateAction<boolean>>;
}

export interface QuestionPalleteButtonProps
  extends Omit<
    QuestionPalleteProps,
    "result" | "start" | "setIsSubmitted" | "score" | "setScore" | "setStart"
  > {
  item: Question;
}

import { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & User;
  }
}
