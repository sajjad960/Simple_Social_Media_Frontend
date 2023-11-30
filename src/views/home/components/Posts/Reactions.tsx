import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';

const Reactions = () => {
  return (
    <div>
        <Box sx={{display: "flex", pl: 4}}>
        <ThumbUpIcon sx={{ fontSize: 40, mr: 2 }} />
        <EmojiEmotionsIcon sx={{ fontSize: 40, mr: 2 }} />
        <FavoriteIcon sx={{ fontSize: 40, mr: 2 }} />
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40, mr: 2 }} />
        <FaceRetouchingNaturalIcon sx={{ fontSize: 40 }} />
        </Box>
    </div>
  )
}

export default Reactions