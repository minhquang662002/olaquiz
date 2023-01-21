import { FC, useState, createContext } from "react";
import LoadingLayout from "../layout/LoadingLayout";

interface ILoadingState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<ILoadingState>({
  isLoading: false,
  setIsLoading: () => {},
});

const GlobalContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading && <LoadingLayout />}

      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };
