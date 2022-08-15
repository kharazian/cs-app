import axios from "axios";
import authHeader from "./auth-header";
import qs from "qs";
const API_URL = "http://localhost:3000/v1/auth/";

const register = (username, email, password) => {
  
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};
const login = (username, password) => {

  const params = { 'email': username, 'password': password };
  return axios
    .post(API_URL + "login", qs.stringify(params))
    .then((response) => {
      if (response.data.tokens.access.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = { refreshToken: "" };
  if (user) {
    params["refreshToken"] = user.tokens.refresh.token;
  }
  return axios
    .post(API_URL + "logout", qs.stringify(params))
    .then((response) => {
      if (response.statusText === "No Content") {
        localStorage.removeItem("user");
      }
      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) || { user: { name:'کاربر', role:'مهمان' }};
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;