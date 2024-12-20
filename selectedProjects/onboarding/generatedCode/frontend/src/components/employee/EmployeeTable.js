import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
const columns = [
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    valueGetter: (params) => new Date(params).toLocaleDateString(),
  },
];
export default function EmployeeTable({ data }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
