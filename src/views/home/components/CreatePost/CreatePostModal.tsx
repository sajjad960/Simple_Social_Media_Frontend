import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import UploadImages from "./UploadImages";

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

export default function CreatePostModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [uploadedImagesFiles, setUploadedImagesFiles] = React.useState<FileList[]>([]);
  console.log(uploadedImages, uploadedImagesFiles)

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Post
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
              Write Your Content
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              multiline
              maxRows={12}
            />
            <Box sx={{ mt: 2 }}>
              <UploadImages uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} setUploadedImagesFiles={setUploadedImagesFiles} />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 3 }}
                onClick={handleClose}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="warning"
                sx={{ mt: 2 }}
                onClick={handleClose}
              >
                Cancle
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
