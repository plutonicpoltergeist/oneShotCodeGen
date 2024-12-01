# Frontend Code1

{
"files":{
"frontend/src/services/api.js":"import axios from 'axios';const api=axios.create({baseURL:'http://localhost:3000/api',headers:{'Content-Type':'application/json'}});api.interceptors.request.use((config)=>{const token=localStorage.getItem('token');if(token){config.headers.Authorization=`Bearer ${token}`}return config});api.interceptors.response.use((response)=>response.data,(error)=>{if(error.response?.status===401){localStorage.removeItem('token');window.location.href='/login'}return Promise.reject(error)});export const login=async(credentials)=>api.post('/auth/login',credentials);export const getEmployees=async()=>api.get('/employees');export const createEmployee=async(data)=>api.post('/employees',data);export const createTask=async(data)=>api.post('/tasks',data);export const assignTask=async(data)=>api.post('/tasks/assign',data);export const uploadDocument=async(data)=>api.post('/documents',data);export const getDocuments=async()=>api.get('/documents');",
"frontend/src/context/AuthContext.js":"import React,{createContext,useState,useContext,useEffect} from 'react';const AuthContext=createContext(null);export const AuthProvider=({children})=>{const [user,setUser]=useState(null);useEffect(()=>{const token=localStorage.getItem('token');if(token){const user=JSON.parse(atob(token.split('.')[1]));setUser(user)}else{setUser(null)}},[]);const login=(token)=>{localStorage.setItem('token',token);const user=JSON.parse(atob(token.split('.')[1]));setUser(user)};const logout=()=>{localStorage.removeItem('token');setUser(null)};return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>};export const useAuth=()=>useContext(AuthContext);",
"frontend/src/hooks/useApi.js":"import {useQuery,useMutation,useQueryClient} from 'react-query';import * as api from '../services/api';export const useEmployees=()=>useQuery('employees',api.getEmployees);export const useCreateEmployee=()=>{const queryClient=useQueryClient();return useMutation(api.createEmployee,{onSuccess:()=>queryClient.invalidateQueries('employees')})};export const useCreateTask=()=>{const queryClient=useQueryClient();return useMutation(api.createTask,{onSuccess:()=>queryClient.invalidateQueries('tasks')})};export const useAssignTask=()=>{const queryClient=useQueryClient();return useMutation(api.assignTask,{onSuccess:()=>queryClient.invalidateQueries('tasks')})};export const useDocuments=()=>useQuery('documents',api.getDocuments);export const useUploadDocument=()=>{const queryClient=useQueryClient();return useMutation(api.uploadDocument,{onSuccess:()=>queryClient.invalidateQueries('documents')})};",
"frontend/src/components/auth/Login.js":"import React from 'react';import {useNavigate} from 'react-router-dom';import {Box,Paper,Typography} from '@mui/material';import Form from '@rjsf/mui';import validator from '@rjsf/validator-ajv8';import {useAuth} from '../../context/AuthContext';import {login} from '../../services/api';const schema={type:'object',required:['email','password'],properties:{email:{type:'string',format:'email',title:'Email'},password:{type:'string',title:'Password'}}};const uiSchema={'ui:submitButtonOptions':{title:'Login'}};export default function Login(){const navigate=useNavigate();const {login:authLogin}=useAuth();const handleSubmit=async({formData})=>{try{const {token}=await login(formData);authLogin(token);navigate('/dashboard')}catch(error){console.error(error)}};return(<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}><Paper sx={{p:4,width:'100%',maxWidth:400}}><Typography variant='h5' sx={{mb:3}}>HR Onboarding System</Typography><Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}/></Paper></Box>);}",
"frontend/src/components/auth/Signup.js":"import React from 'react';import {useNavigate} from 'react-router-dom';import {Box,Paper,Typography} from '@mui/material';import Form from '@rjsf/mui';import validator from '@rjsf/validator-ajv8';import {useCreateEmployee} from '../../hooks/useApi';const schema={type:'object',required:['email','password','firstName','lastName'],properties:{email:{type:'string',format:'email',title:'Email'},password:{type:'string',title:'Password'},firstName:{type:'string',title:'First Name'},lastName:{type:'string',title:'Last Name'},startDate:{type:'string',format:'date',title:'Start Date'}}};const uiSchema={'ui:submitButtonOptions':{title:'Sign Up'}};export default function Signup(){const navigate=useNavigate();const createEmployee=useCreateEmployee();const handleSubmit=async({formData})=>{try{await createEmployee.mutateAsync(formData);navigate('/login')}catch(error){console.error(error)}};return(<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}><Paper sx={{p:4,width:'100%',maxWidth:400}}><Typography variant='h5' sx={{mb:3}}>Create Account</Typography><Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}/></Paper></Box>);}",
"frontend/src/components/layout/Header.js":"import React,{useState} from 'react';import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem,Avatar,Box} from '@mui/material';import {useNavigate} from 'react-router-dom';import {useAuth} from '../../context/AuthContext';export default function Header({title,links=[]}){const navigate=useNavigate();const {user,logout}=useAuth();const [anchorEl,setAnchorEl]=useState(null);const handleMenu=(event)=>setAnchorEl(event.currentTarget);const handleClose=()=>setAnchorEl(null);const handleLogout=()=>{logout();navigate('/login');handleClose()};return(<AppBar position='static'><Toolbar><Typography variant='h6' component='div' sx={{flexGrow:1}}>{title}</Typography>{links.map((link)=>(<Typography key={link.path} sx={{mx:2,cursor:'pointer'}} onClick={()=>navigate(link.path)}>{link.label}</Typography>))}{user&&(<Box><IconButton onClick={handleMenu}><Avatar/></IconButton><Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}><MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem><MenuItem onClick={handleLogout}>Logout</MenuItem></Menu></Box>)}</Toolbar></AppBar>);}"
},
"commands":["npx create-react-app frontend --template typescript","cd frontend && npm install @mui/material @emotion/react @emotion/styled @mui/icons-material","cd frontend && npm install react-router-dom","cd frontend && npm install axios react-query","cd frontend && npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/mui","cd frontend && npm install recharts"]
}