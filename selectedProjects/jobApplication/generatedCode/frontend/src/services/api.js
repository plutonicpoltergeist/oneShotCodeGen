import axios from 'axios';const API_URL='${process.env.REACT_APP_API_URL}/api';const api=axios.create({baseURL:API_URL});api.interceptors.request.use((config)=>{const token=localStorage.getItem('token');if(token){config.headers.Authorization=`Bearer ${token}`;}return config;});api.interceptors.response.use((response)=>response.data,(error)=>{if(error.response?.status===401){localStorage.removeItem('token');window.location.href='/login';}return Promise.reject(error);});export const login=async(credentials)=>{const response=await api.post('/auth/login',credentials);localStorage.setItem('token',response.token);localStorage.setItem('user',JSON.stringify(response.user));return response;};export const getApplications=async()=>await api.get('/applications');export const createApplication=async(data)=>await api.post('/applications',data);export const updateApplication=async(id,data)=>await api.put(`/applications/${id}`,data);export const deleteApplication=async(id)=>await api.delete(`/applications/${id}`);