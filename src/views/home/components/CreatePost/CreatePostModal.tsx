import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import UploadImages from "./UploadImages";
import { PostFormData } from "../../../../api/Common/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../../../../hooks/useApi";
import useSnackbarSuccess from "../../../../hooks/useSnackbarSuccess";
import CircularProgress from "@mui/material/CircularProgress";
import { cacheKeys } from "../../../../api/CacheKeys";
import useSnackbarError from "../../../../hooks/useSnackbarError";

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
  const queryClient = useQueryClient();
  const api = useApi({ formData: true });
  const showSuccessMessage = useSnackbarSuccess();
  const showErrorMessage = useSnackbarError();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = React.useState<string>("");
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [uploadedImagesFiles, setUploadedImagesFiles] = React.useState<File[]>(
    []
  );
  const formRef = React.useRef<HTMLFormElement | null>();

  const resetFormData = () => {
    handleClose();
    setUploadedImages([]);
    setUploadedImagesFiles([]);
    setText("");

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (params: PostFormData) => api.createPost(params),
    onSuccess: (data) => {
      console.log(data);

      resetFormData();
      showSuccessMessage({ message: "Post Created Successfully" });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.posts],
      });
    },
    onError: () => showErrorMessage({error: "Something went rong, Please try again"})
  });

  const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bodyData: PostFormData = {
      text: text,
      images: uploadedImagesFiles,
    };
    mutate(bodyData);
  };
  return (
    <div>
      <Box>
        <Button variant="contained" onClick={handleOpen}>
          Create Post
        </Button>
      </Box>
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
          <Box
            sx={style}
            component="form"
            ref={formRef}
            onSubmit={handleCreatePost}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Write Your Content
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              multiline
              maxRows={12}
              label="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="text"
            />
            <Box sx={{ mt: 2 }}>
              <UploadImages
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                setUploadedImagesFiles={setUploadedImagesFiles}
              />
            </Box>
            {isPending ? (
              <Box sx={{ mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mr: 3 }}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ mt: 2 }}
                  onClick={resetFormData}
                >
                  Cancle
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
