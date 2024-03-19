import React from 'react';
import { Box, Pagination } from '@mui/material';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function CustomPagination({ currentPage, totalPages, onPageChange }: CustomPaginationProps) {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
    </Box>
  );
}

export default CustomPagination;
