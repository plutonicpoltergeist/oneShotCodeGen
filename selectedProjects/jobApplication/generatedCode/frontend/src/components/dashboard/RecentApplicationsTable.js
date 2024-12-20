import React from "react";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "candidateName", headerName: "Candidate", flex: 1 },
  { field: "position", headerName: "Position", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    valueGetter: (params) => new Date(params).toLocaleDateString(),
  },
];
export default function RecentApplicationsTable({ applications }) {
  return (
    <DataGrid
      rows={applications}
      columns={columns}
      autoHeight
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
    />
  );
}
