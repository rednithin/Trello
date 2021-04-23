import React, { createContext } from "react";
import { initialState, reducer } from "./reducer";

export const AppContext = createContext({
  state: initialState,
  dispatch: null,
} as any);
AppContext.displayName = "Store";

export const useAppContext = (): [typeof initialState, Function] =>
  React.useContext(AppContext);

interface IAppContextProvider {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<IAppContextProvider> = ({
  children,
}) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[globalState, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
