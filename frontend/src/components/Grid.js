import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Grid = ({ rows, columns, ...props }) => {
  return (
    <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        {...props}
      />
    </Box>
  );
};

export default Grid;
