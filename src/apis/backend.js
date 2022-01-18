import axios from "axios";
import { BACKEND_URL } from "../config/index";

export default axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
