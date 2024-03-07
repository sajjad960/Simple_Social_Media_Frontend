import { Box, Button } from "@mui/material";
import CommentBox from "./CommentBox";
import { useState } from "react";

interface CommentSectionTypes {
  postId: number;
}

const CommentSection: React.FC<CommentSectionTypes> = ({ postId }) => {
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
      <Box>{openCommentSection && <CommentBox showReplies={true} postId={postId} />}</Box>
    </div>
  );
};

export default CommentSection;
