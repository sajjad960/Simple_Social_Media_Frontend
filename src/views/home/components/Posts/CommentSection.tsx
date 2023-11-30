import { Box, Button } from "@mui/material";
import CommentBox from "./CommentBox";
import { useState } from "react";

const CommentSection = () => {
  const [openCommentSection, setopenCommentSection] = useState(false);
  return (
    <div>
      <Button
        sx={{ fontSize: "1rem" }}
        color="success"
        onClick={function () {
          setopenCommentSection(!openCommentSection);
        }}
      >
        Comment
      </Button>
      <Box>{openCommentSection && <CommentBox />}</Box>
    </div>
  );
};

export default CommentSection;
