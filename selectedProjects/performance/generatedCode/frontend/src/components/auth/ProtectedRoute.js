import React from'react';import{Navigate}from'react-router-dom';import{useAuth}from'../../context/AuthContext';const ProtectedRoute=({children,adminOnly=false})=>{const{user,loading}=useAuth();if(loading)return null;if(!user)return<Navigate to='/login'/>;if(adminOnly&&user.role!=='admin')return<Navigate to='/error'/>;return children;};export default ProtectedRoute;