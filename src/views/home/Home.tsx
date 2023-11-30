import { Container } from "@mui/material"
import CreatePost from "./components/CreatePost/CreatePost"
import Posts from "./components/Posts/Posts"
import SimpleAppBar from "./components/SimpleAppBar"

const Home = () => {
  return (
    <div>
      <SimpleAppBar/>
      <Container sx={{p: 4}}>
      <CreatePost/>
      <Posts/>

      </Container>
    </div>
  )
}

export default Home