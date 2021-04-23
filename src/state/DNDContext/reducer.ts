import * as ActionTypes from "./actions";

export const initialState = {
  isDnD: false,
};

interface IActionType {
  type: string;
  payload: any;
}

export const reducer = (state: typeof initialState, action: IActionType) => {
  switch (action.type) {
    case ActionTypes.SET_DND_STATUS: {
      return {
        ...state,
        isDnD: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
