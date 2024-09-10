import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const Grid = ({ rows, columns, ...props }) => {
  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}  // Extract unique id from each row
        {...props}
      />
    </Box>
  );
};

export default Grid;
