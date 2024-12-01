import React from'react';import{Container,Typography,Button,Box}from'@mui/material';import{useNavigate}from'react-router-dom';export const NotFoundPage=()=>{const navigate=useNavigate();return(<Container><Box sx={{mt:8,textAlign:'center'}}><Typography variant='h1'>404</Typography><Typography variant='h5'>Page Not Found</Typography><Button variant='contained' sx={{mt:2}} onClick={()=>navigate('/')}>Go Home</Button></Box></Container>);};