import React, { createContext, useState } from "react";

export const TaskValueContext = createContext({} as any);

TaskValueContext.displayName = "Store";

interface ITaskValueContextProvider {
  children: React.ReactNode;
}

export const TaskValueContextProvider: React.FC<ITaskValueContextProvider> = ({
  children,
}) => {
  const [taskValues, setTaskValues] = useState({});
  
  return (
    <TaskValueContext.Provider value={{taskValues, setTaskValues}}>
      {children}
    </TaskValueContext.Provider>
  );
};
