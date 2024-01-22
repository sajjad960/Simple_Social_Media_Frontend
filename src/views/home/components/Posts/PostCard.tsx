import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardActionArea from "@mui/material/CardActionArea";
import Reactions from "./Reactions";
import CommentSection from "./CommentSection";
import { PostTypes, UserDataTypes } from "../../../../api/Common/types";
import { API_BASE_URL } from "../../../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";

interface PostCardProps {
  post: PostTypes;
}
interface QueryDataTypes {
  data: UserDataTypes;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const queryClient = useQueryClient();
  const images: string[] = JSON.parse(post.images);
  const data = queryClient.getQueryData<QueryDataTypes>([cacheKeys.profile]);
  const userId = data?.data?.id;

  return (
    <Card sx={{ maxWidth: 400, transition: "none" }}>
      <CardActionArea disableRipple>
        <ImageList sx={{ width: 400, height: 300 }} cols={images.length} rowHeight={164}>
          {images?.length > 0 &&
            images.map((imageName, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${API_BASE_URL}/posts/uploads/${userId}/${imageName}`}
                  src={`${API_BASE_URL}/posts/uploads/${userId}/${imageName}`}
                  alt={imageName}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </ImageList>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent sx={{height: 60}}>
          <Typography gutterBottom variant="h5" component="div">
            {post.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Reactions size={40} />
      <CommentSection />
    </Card>
  );
};
export default PostCard;
