import { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type uploadImageProps = {
  uploadedImages: string[],
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>,
  setUploadedImagesFiles: React.Dispatch<React.SetStateAction<FileList[]>>,
}

export default function UploadImages({uploadedImages, setUploadedImages, setUploadedImagesFiles}: uploadImageProps) {
  // const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    // Check if files is not null before proceeding
    if (files) {
      setUploadedImagesFiles((prevImages) => [...prevImages, files])
      // Convert the FileList to an array
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      // Update the state with the new images
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  

  return (
    <div>
      <Box>
        {/* Display uploaded images */}
        {uploadedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Uploaded ${index + 1}`}
            style={{ width: "100px", height: "100px", margin: "8px" }}
          />
        ))}
      </Box>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        Upload Images
        <VisuallyHiddenInput
          type="file"
          multiple
          accept="image/*"
          name="uploadImages"
          id="uploadImages"
          onChange={handleImageUpload}
        />
      </Button>
    </div>
  );
}
