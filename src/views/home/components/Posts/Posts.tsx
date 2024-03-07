import { Box, Container, Grid, LinearProgress, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";
import useApi from "../../../../hooks/useApi";
import { PostTypes } from "../../../../api/Common/types";

const Posts = () => {
  const api = useApi({ formData: false });
  const { data, isLoading } = useQuery({
    queryKey: [cacheKeys.posts],
    queryFn: api.getPosts,
  });
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h4">
        All Posts
      </Typography>

      {isLoading && <LinearProgress sx={{marginTop: "5rem"}} />}
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
                  <PostCard post={post} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Posts;
