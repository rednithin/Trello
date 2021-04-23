export const SET_DND_STATUS = "SET_DND_STATUS";
export const setDndStatus = (status: boolean) => {
  return {
    type: SET_DND_STATUS,
    payload: status,
  };
};
