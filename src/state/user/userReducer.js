import { LOAD_USER_DENIED, LOAD_USER_SUCCESS } from "./userTypes";

const initialState = {
  first_name: null,
  last_name: null,
  username: null,
  decks: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        ...payload.user,
      };
      break;
    case LOAD_USER_DENIED:
      return {
        ...state,
        first_name: null,
        last_name: null,
        username: null,
        decks: null,
      };
      break;
    default:
      return state;
  }
};

export default userReducer;
