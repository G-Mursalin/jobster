import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://jobster-z8pv.onrender.com",
});

export default customFetch;
