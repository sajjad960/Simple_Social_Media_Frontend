import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardActionArea from "@mui/material/CardActionArea";
import Reactions from "./Reactions";
import CommentSection from "./CommentSection";
import { PostTypes } from "../../../../api/Common/types";
import { API_BASE_URL } from "../../../../utils";
import { Box } from "@mui/material";

interface PostCardProps {
  post: PostTypes;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const images: string[] = JSON.parse(post.images);
  const userId = post.user_id;
  const postId = post.id

  return (
    <Card sx={{ maxWidth: 400, transition: "none" }}>
      <CardActionArea disableRipple>
        <ImageList
          sx={{ width: 400, height: 300 }}
          cols={images.length}
          rowHeight={164}
        >
          {post.restricted ? (
            <Box
              height={200}
              width={370}
              fontSize={40}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              This image is restricted
            </Box>
          ) : (
            images?.length > 0 &&
            images.map((imageName, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${API_BASE_URL}/posts/uploads/${userId}/${imageName}`}
                  src={`${API_BASE_URL}/posts/uploads/${userId}/${imageName}`}
                  alt={imageName}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          )}
        </ImageList>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent sx={{ height: 60 }}>
          <Typography gutterBottom variant="h5" component="div">
            {post.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Reactions size={40} />
      <CommentSection postId={postId}/>
    </Card>
  );
};
export default PostCard;
