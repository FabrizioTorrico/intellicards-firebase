import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";

export default combineReducers({ auth: authReducer, user: userReducer });
