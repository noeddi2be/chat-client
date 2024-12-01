import axios from 'axios';

let API_URL = 'http://javaprojects.ch:50001';

export const setApiUrl = (url) => {
  API_URL = url;
  axios.defaults.baseURL = API_URL;
};

// Set up interceptors for debugging in browser console:
// axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

// axios.interceptors.response.use(response => {
//   console.log('Response:', JSON.stringify(response, null, 2));
//   return response;
// });

export const pingServer = () => axios.get(`${API_URL}/ping`);

export const checkToken = (token) => 
  axios.post(`${API_URL}/ping`, { token });

export const registerUser = (username, password) => 
  axios.post(`${API_URL}/user/register`, { username, password });

export const loginUser = (username, password) => 
  axios.post(`${API_URL}/user/login`, { username, password });

export const sendMessage = (token, username, message) => 
  axios.post(`${API_URL}/chat/send`, { token, username, message });

export const pollMessages = (token) => 
  axios.post(`${API_URL}/chat/poll`, { token });

export const logoutUser = (token) =>
  axios.post(`${API_URL}/user/logout`, { token });

export const getUsers = () => 
  axios.get(`${API_URL}/users/online`);

export const checkUserOnline = (token, username) => 
  axios.post(`${API_URL}/user/online`, { token, username });