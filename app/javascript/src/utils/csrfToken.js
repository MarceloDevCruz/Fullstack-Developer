import axios from "axios";

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

const http = axios.create({
  withCredentials: true,
  headers: {
    "X-CSRF-Token": csrfToken,
    "Accept": "application/json",
  },
});

export default http;