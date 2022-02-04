import { LOAD_USER_DENIED, LOAD_USER_SUCCESS } from "./userTypes";

export const loadUser = () => async (dispatch) => {
  try {
    console.log("loadUser in");
    const res = await fetch("api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type: LOAD_USER_DENIED });
    }
  } catch (err) {
    console.log("error");
    dispatch({ type: LOAD_USER_DENIED });
  }
};
