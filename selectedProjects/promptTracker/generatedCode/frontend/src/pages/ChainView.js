import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/common/Header";
import ChainGrid from "../components/chains/ChainGrid";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../services/api";
import LoadingState from "../components/common/LoadingState";
const ChainView = () => {
  const queryClient = useQueryClient();
  const { data: chains, isLoading } = useQuery("chains", () =>
    axiosInstance.get("/api/chains")
  );
  const deleteMutation = useMutation((id) => axiosInstance.delete(`/api/chains/${id}`), {
    onSuccess: () => queryClient.invalidateQueries("chains"),
  });
  if (isLoading) return <LoadingState />;
  return (
    <Box>
      <Header
        title="Chain View"
        menuItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Admin", path: "/admin" },
        ]}
      />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <ChainGrid
            chains={chains}
            onDelete={(chain) => deleteMutation.mutate(chain.id)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ChainView;
