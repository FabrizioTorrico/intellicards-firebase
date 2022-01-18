import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await fetch("api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("status: ", res.status);
    const data = await res.json();
    console.log("data: ", data);

    if (res.status === 200) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type: LOAD_USER_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  try {
    console.log("checking");
    await axios
      .get("/api/account/verify/", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: AUTHENTICATED_SUCCESS });
          dispatch(loadUser());
        }
      })
      .catch(() => dispatch({ type: AUTHENTICATED_FAIL }));
  } catch (err) {
    dispatch({ type: AUTHENTICATED_FAIL });
  }
  dispatch({ type: REMOVE_AUTH_LOADING });
};

export const signup = (formData) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });

  const body = JSON.stringify(formData);

  try {
    await axios
      .post("/api/account/signup", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => dispatch({ type: REGISTER_SUCCESS }))
      .catch(() => dispatch({ type: REGISTER_FAIL }));
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }
  dispatch({ type: REMOVE_AUTH_LOADING });
};

export const resetRegisterSuccess = (formData) => async (dispatch) => {
  dispatch({ type: RESET_REGISTER_SUCCESS });
};

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING });
    const body = JSON.stringify({ username, password });
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (res.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(loadUser());
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });
    }
    dispatch({ type: REMOVE_AUTH_LOADING });
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  await axios
    .post("/api/account/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGOUT_SUCCESS });
      }
    })
    .catch(() => dispatch({ type: LOGOUT_FAIL }));

  dispatch({ type: REMOVE_AUTH_LOADING });
};
