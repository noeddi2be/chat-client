import axios from 'axios';

const API_URL = 'http://127.0.0.1:50001';

export const pingServer = () => axios.get(`${API_URL}/ping`);

export const registerUser = (username, password) => 
  axios.post(`${API_URL}/user/register`, { username, password });

export const loginUser = (username, password) => 
  axios.post(`${API_URL}/user/login`, { username, password });

export const sendMessage = (token, username, message) => 
  axios.post(`${API_URL}/chat/send`, { token, username, message });

export const pollMessages = (token) => 
  axios.post(`${API_URL}/chat/poll`, { token });