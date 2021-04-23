import React, { createContext } from "react";
import { initialState, reducer } from "./reducer";

export const DnD = createContext({
  state: initialState,
  dispatch: null,
} as any);

DnD.displayName = "DnD";

export const useDnD = (): [typeof initialState, Function] =>
  React.useContext(DnD);

interface IDnDContextProvider {
  children: React.ReactNode;
}

export const DnDContextProvider: React.FC<IDnDContextProvider> = ({
  children,
}) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DnD.Provider value={[globalState, dispatch]}>{children}</DnD.Provider>
  );
};
