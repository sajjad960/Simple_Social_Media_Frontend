import React, { Suspense } from "react";
import { CircularProgress, Container } from "@mui/material";
import CreatePost from "./components/CreatePost/CreatePost";
// import Posts from "./components/Posts/Posts"
import SimpleAppBar from "./components/SimpleAppBar";
const Posts = React.lazy(() => import("./components/Posts/Posts"));

const Home = () => {
  return (
    <div>
      <SimpleAppBar />
      <Container sx={{ p: 4 }}>
        <CreatePost />
        <Suspense fallback={<CircularProgress sx={{ mt: "1rem" }} />}>
          <Posts />
        </Suspense>{" "}
      </Container>
    </div>
  );
};

export default Home;
