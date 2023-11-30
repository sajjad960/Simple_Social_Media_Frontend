import { Box, Button } from "@mui/material"
import CommentBox from "./CommentBox"


const CommentSection = () => {
  return (
    <div>
        <Button sx={{fontSize: "1rem"}} color="success" onClick={function(){}} >
            Comment
        </Button>
        <Box>
            <CommentBox/>
        </Box>
    </div>
  )
}

export default CommentSection