import axios from "axios";
// import bcrypt from 'bcryptjs';

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  // username: import.meta.env.VITE_REACT_APP_API_USERNAME,
  // password: bcrypt.hashSync(import.meta.env.VITE_REACT_APP_API_PASSWORD, 8),
};

const BASE_API = import.meta.env.VITE_REACT_APP_API_URL;

export const loginApi = axios.create({
  baseURL: BASE_API,
});

export const api = axios.create({
  baseURL: BASE_API,
  headers: { ...defaultHeaders },
});

export const createSession = async (cpf, password) => {
  return loginApi.post("/login", { cpf, senha: password });
};