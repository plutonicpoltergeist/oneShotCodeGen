import React from 'react';import {DataGrid} from '@mui/x-data-grid';import {Box} from '@mui/material';const columns=[{field:'type',headerName:'Type',flex:1},{field:'status',headerName:'Status',flex:1},{field:'fileUrl',headerName:'File',flex:1},{field:'employeeId',headerName:'Employee ID',flex:1}];export default function DocumentTable({data}){return(<Box sx={{height:400,width:'100%'}}><DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableSelectionOnClick/></Box>);}