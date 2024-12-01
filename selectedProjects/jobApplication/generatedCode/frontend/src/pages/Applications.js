import React,{useState}from'react';import{Container,Button,Dialog}from'@mui/material';import Header from'../components/layout/Header';import ApplicationsTable from'../components/applications/ApplicationsTable';import ApplicationForm from'../components/applications/ApplicationForm';import{useApplications,useCreateApplication,useUpdateApplication,useDeleteApplication}from'../hooks/useApplications';import LoadingState from'../components/common/LoadingState';const menuItems=[{label:'Dashboard',path:'/'},{label:'Applications',path:'/applications'},{label:'Admin',path:'/admin'}];export default function Applications(){const{data:applications,isLoading}=useApplications();const createMutation=useCreateApplication();const updateMutation=useUpdateApplication();const deleteMutation=useDeleteApplication();const[open,setOpen]=useState(false);const[editData,setEditData]=useState(null);const handleSubmit=async(formData)=>{if(editData){await updateMutation.mutateAsync({id:editData.id,data:formData});}else{await createMutation.mutateAsync(formData);}setOpen(false);setEditData(null);};const handleEdit=(application)=>{setEditData(application);setOpen(true);};const handleDelete=async(id)=>{await deleteMutation.mutateAsync(id);};if(isLoading)return<LoadingState/>;return(<div><Header title='JobTrax'menuItems={menuItems}/><Container maxWidth='lg'sx={{mt:4,mb:4}}><Button variant='contained'onClick={()=>setOpen(true)}sx={{mb:2}}>Add Application</Button><ApplicationsTable applications={applications||[]}onEdit={handleEdit}onDelete={handleDelete}/><Dialog open={open}onClose={()=>{setOpen(false);setEditData(null);}}maxWidth='md'fullWidth><ApplicationForm onSubmit={handleSubmit}initialData={editData}/></Dialog></Container></div>);}