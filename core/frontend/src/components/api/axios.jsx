import axios from "axios";

export const axiosUser = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})




