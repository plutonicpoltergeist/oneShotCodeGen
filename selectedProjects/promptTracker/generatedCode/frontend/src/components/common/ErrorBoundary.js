import React from'react';import{Box,Typography,Button}from'@mui/material';class ErrorBoundary extends React.Component{constructor(props){super(props);this.state={hasError:false};}static getDerivedStateFromError(error){return{hasError:true};}render(){if(this.state.hasError){return(<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}><Typography variant='h4' gutterBottom>Something went wrong</Typography><Button variant='contained' onClick={()=>window.location.reload()}>Reload Page</Button></Box>);}return this.props.children;}}export default ErrorBoundary;