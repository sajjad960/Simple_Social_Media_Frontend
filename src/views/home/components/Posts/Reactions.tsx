import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import { ReactionTypes } from "../../../../api/Common/types";

type ReactionProps = {
  size: number;
  reactions: ReactionTypes;
};
const Reactions = ({ size, reactions }: ReactionProps) => {
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
        <Box sx={{ mr: 2, cursor: "pointer" }}>
          <ThumbUpIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.like ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }}>
          <EmojiEmotionsIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.haha ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }}>
          <FavoriteIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.love ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }}>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.sad ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }}>
          <FaceRetouchingNaturalIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.angry ?? 0}
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default Reactions;
