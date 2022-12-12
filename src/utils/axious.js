import axios from "axios";

// http://localhost:3001/
// https://jobster-z8pv.onrender.com

const customFetch = axios.create({
  baseURL: "http://localhost:3001",
});

export default customFetch;
