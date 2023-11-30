import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";

type ReactionProps = {
  size: number
}
const Reactions = ({size}: ReactionProps) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          pl: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{mr: 2}}>
          <ThumbUpIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            0
          </p>
        </Box>
        <Box sx={{mr: 2}}>
        <EmojiEmotionsIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            0
          </p>
        </Box>
        <Box sx={{mr: 2}}>
        <FavoriteIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            0
          </p>
        </Box>
        <Box sx={{mr: 2}}>
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            0
          </p>
        </Box>
        <Box sx={{mr: 2}}>
        <FaceRetouchingNaturalIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            0
          </p>
        </Box>
        
      </Box>
    </div>
  );
};

export default Reactions;
