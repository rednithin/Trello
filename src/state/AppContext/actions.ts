export const SET_ADD_TASK_MODAL_STATUS = "SET_ADD_TASK_MODAL_STATUS";
export const setAddTaskModalStatus = (payload: any) => {
  return {
    type: SET_ADD_TASK_MODAL_STATUS,
    payload,
  };
};

export const SET_ADD_LIST_MODAL_STATUS = "SET_ADD_LIST_MODAL_STATUS";
export const setAddListModalStatus = (status: boolean) => {
  return {
    type: SET_ADD_LIST_MODAL_STATUS,
    payload: status,
  };
};
