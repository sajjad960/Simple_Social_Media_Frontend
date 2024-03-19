import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import PostCard from "./PostCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";
import useApi from "../../../../hooks/useApi";
import { PostTypes } from "../../../../api/Common/types";
import { useState } from "react";
import CustomPagination from "../Pagination";

export type PostFilterTypes = {
  page: number;
};

const Posts = () => {
  const api = useApi({ formData: false });
  const [filters, setFilters] = useState<PostFilterTypes>({
    page: 1,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [cacheKeys.posts, filters.page],
    queryFn: () => api.getPosts(filters),
    placeholderData: keepPreviousData,
  });

  const pageSize = 9;
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = async (newPage: number) => {

    await setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        page: newPage,
      };
      return updatedFilters;
    });
    refetch(); // Call refetch after updating filters
  };
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h4">
        All Posts
      </Typography>

      {isLoading && <LinearProgress sx={{ marginTop: "5rem" }} />}
      {data && data.data.length === 0 && (
        <Typography variant="h5" component="h5">
          No Post Available....
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {data &&
            data?.data?.map((post: PostTypes, index: number) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PostCard post={post} pageNumber={filters.page} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {data && (
        <CustomPagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Posts;
