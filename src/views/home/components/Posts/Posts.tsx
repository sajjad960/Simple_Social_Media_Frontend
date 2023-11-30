import { Box, Container, Grid, Typography } from "@mui/material";
import PostCard from "./PostCard";

const Posts = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h4">
        All Posts..............
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
