import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { LinearProgress, Typography } from "@mui/material";
import Reactions from "./Reactions";
import RepliesModal from "./RepliesModal";
import useApi from "../../../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";

type CommentBoxPros = {
  showReplies: boolean;
  postId: number;
};

type CommentTypes = {
  id: number;
  post_id: number;
  text: string;
  replies_count: number | null;
};

export default function CommentBox({ showReplies, postId }: CommentBoxPros) {
  const api = useApi({ formData: false });

  const { data, isLoading, error } = useQuery({
    queryKey: [cacheKeys.comments, postId],
    queryFn: () => api.getComments(postId),
  });
  const comments: CommentTypes[] = data?.data;



  return (
    <>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          minRows={1}
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <Button sx={{ ml: "auto" }}>Send</Button>
            </Box>
          }
          sx={{
            minWidth: 300,
          }}
        />
      </FormControl>
      {isLoading && <LinearProgress sx={{ marginTop: "1rem" }} />}
      {error && <Typography>{error.message}</Typography>}
      {comments?.length > 0 ? (
        comments.map((comment: CommentTypes, i: number) => {
          return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                }}
                key={i}
              >
                <Box sx={{ width: "10rem" }}>
                  <Typography variant="h5" component="h5">
                    sajjad
                  </Typography>
                  <Typography>{comment.text}</Typography>
                  <Reactions size={20} />
                </Box>
                <Box>
                  {showReplies && (
                    <RepliesModal repliesCount={comment?.replies_count} />
                  )}
                </Box>
              </Box>
          );
        })
      ) : (
        <Typography>No Comment Available</Typography>
      )}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box sx={{ width: "10rem" }}>
          <Typography variant="h5" component="h5">
            Sajjad
          </Typography>
          <Typography>new Comment ,ksjdfksd lsdjflsd lkjskdlfkl</Typography>
          <Reactions size={20} />
        </Box>
        <Box>
          {showReplies && (
            <RepliesModal repliesCount={comments?.replies_count} />
          )}
        </Box>
      </Box> */}
    </>
  );
}
