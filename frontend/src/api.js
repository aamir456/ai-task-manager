// frontend/src/api.js
import axios from "axios";

export default axios.create({
  baseURL: "/tasks",
});
