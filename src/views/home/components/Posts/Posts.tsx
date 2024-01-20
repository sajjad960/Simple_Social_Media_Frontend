import { Box, Container, Grid, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";
import useApi from "../../../../hooks/useApi";

const Posts = () => {
  const api = useApi({formData: false})
  const {data} = useQuery({
    queryKey: [cacheKeys.posts],
    queryFn: api.getPosts
  })
  console.log(data);
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h4">
        All Posts
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <PostCard />
          </Grid>
         
        </Grid>
      </Box>
    </Container>
  );
};

export default Posts;
