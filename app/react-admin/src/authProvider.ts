import { AuthProvider, HttpError } from "react-admin";
import axios, { AxiosResponse } from 'axios';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response: AxiosResponse = await axios.post(`http://localhost:3000/api/auth/check_auth/${username}/${password}`);
    if (response.data !== "Неверный логин или пароль"){
      localStorage.setItem('user_token', response.data)
      return Promise.resolve('success');
    }
    return Promise.reject('Неверный логин или пароль')
  },
  logout: async () => {
    const response: AxiosResponse = await axios.post(`http://localhost:3000/api/auth/deleteSession/${localStorage.getItem('user_token')}`);
    localStorage.removeItem("user_token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const user_token = localStorage.getItem('user_token')
    if (!user_token) return Promise.reject()
    const response: AxiosResponse = await axios.post(`http://localhost:3000/api/auth/checkSession/${user_token}`);
    return response.data ? Promise.resolve() : Promise.reject('Введите логин и пароль еще раз!')

  },
  getPermissions: async () => {
    const user_token = localStorage.getItem('user_token')
    if (!user_token) return Promise.reject()
    const response: AxiosResponse = await axios.post(`http://localhost:3000/api/user/checkRoles/${user_token}`);
    const roles = response.data
    localStorage.setItem('role', roles)
    return roles ? Promise.resolve(roles):Promise.reject()
  }
};

export default authProvider;
