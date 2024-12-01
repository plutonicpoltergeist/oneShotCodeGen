import React from'react';import{Container,Grid}from'@mui/material';import{Header}from'../components/layout/Header';import{UserGrid}from'../components/admin/UserGrid';import{SettingsForm}from'../components/forms/SettingsForm';const menuItems=[{label:'Dashboard',path:'/dashboard'},{label:'Inventory',path:'/inventory'},{label:'Sales',path:'/sales'},{label:'Menu',path:'/menu'},{label:'Admin',path:'/admin'}];export const AdminPage=()=>(<><Header title='Admin Panel' menuItems={menuItems}/><Container><Grid container spacing={3}><Grid item xs={12} md={8}><UserGrid data={[]} loading={false}/></Grid><Grid item xs={12} md={4}><SettingsForm onSubmit={()=>{}}/></Grid></Grid></Container></>);