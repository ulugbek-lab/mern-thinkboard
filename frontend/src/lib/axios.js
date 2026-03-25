import axios from "axios";
console.log(axios);

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});
export default api;
