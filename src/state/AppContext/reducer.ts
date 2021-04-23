import * as ActionTypes from "./actions";

export const initialState = {
  isAddTaskModalOpen: false,
  isAddListModalOpen: false,
  selectedListId: "",
};

interface IActionType {
  type: string;
  payload: any;
}

export const reducer = (state: typeof initialState, action: IActionType) => {
  switch (action.type) {
    case ActionTypes.SET_ADD_TASK_MODAL_STATUS: {
      return {
        ...state,
        isAddTaskModalOpen: action.payload.status,
        selectedListId: action.payload.listId,
      };
    }
    case ActionTypes.SET_ADD_LIST_MODAL_STATUS: {
      return {
        ...state,
        isAddListModalOpen: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
