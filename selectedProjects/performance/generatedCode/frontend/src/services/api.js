import axios from 'axios';const API_URL='${process.env.REACT_APP_API_URL}/api';const api=axios.create({baseURL:API_URL});api.interceptors.request.use((config)=>{const token=localStorage.getItem('token');if(token){config.headers.Authorization=`Bearer ${token}`}return config});api.interceptors.response.use((response)=>response.data,(error)=>{if(error.response?.status===401){localStorage.removeItem('token');window.location.href='/login'}return Promise.reject(error)});export const login=async(credentials)=>{const response=await api.post('/auth/login',credentials);localStorage.setItem('token',response.token);return response};export const getReviews=()=>api.get('/reviews');export const createReview=(data)=>api.post('/reviews',data);export const getReviewCycles=()=>api.get('/review-cycles');export const createReviewCycle=(data)=>api.post('/review-cycles',data);