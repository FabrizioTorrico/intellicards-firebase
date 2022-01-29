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
  REFRESH_FAIL,
  REFRESH_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  register_success: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true,
      };
      break;
    case REGISTER_FAIL:
      return {
        ...state,
      };
      break;
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: false,
      };
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
      break;
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
      break;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: false,
      };
      break;
    case LOGOUT_FAIL:
      return {
        ...state,
      };
      break;
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
      break;
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
      };
      break;
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
      break;
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      break;
    case REFRESH_SUCCESS:
      return {
        ...state,
      };
      break;
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      break;
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
      break;
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
      break;
    default:
      return state;
  }
};
export default authReducer;
