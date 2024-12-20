import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const login = async (credentials) => {
  console.log(API_URL);
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  console.log(data);
  return data;
};

export const signup = async (userData) => {
  const { data } = await axios.post(`${API_URL}/signup`, userData);
  return data;
};
