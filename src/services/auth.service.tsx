import axios from "axios";
import { environment } from "environments/environment";

// First access key at /session-request
export const AK_KEY = "@adopets-AccessKey";

// bearer token. After using access_key
export const TOKEN_KEY = "@adopets-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string) => {
  console.log(token)
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(AK_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// Used to get the first access_key at /session-request
export const setAccessKey = (key: string) => {
  localStorage.setItem(AK_KEY, key);
};

export const getAccessKey = () => localStorage.getItem(AK_KEY);

export const authAPI = axios.create({
  baseURL: environment.authUrl
})

// Axios Interceptor
authAPI.interceptors.request.use(async config => {
  config.headers.common['Content-Type'] = 'application/json'

  if (isAuthenticated()) {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
