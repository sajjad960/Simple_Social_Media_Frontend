import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import CommentBox from "./CommentBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type RepliesPropsTypes = {
  repliesCount: number | null;
};

export default function RepliesModal({ repliesCount }: RepliesPropsTypes) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="soft" onClick={handleOpen}>
        Reply ({repliesCount ?? 0})
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Reply the comment
            </Typography>
            <CommentBox showReplies={false} postId={0} />
            <Button
              variant="outlined"
              color="warning"
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Cancle
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
