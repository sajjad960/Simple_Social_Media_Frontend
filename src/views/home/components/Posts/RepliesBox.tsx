import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import useApi from "../../../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSnackbarSuccess from "../../../../hooks/useSnackbarSuccess";
import { useState } from "react";
import { cacheKeys } from "../../../../api/CacheKeys";
import { ReactionTypes, ReplyParams } from "../../../../api/Common/types";
import Reactions from "./Reactions";
// import Reactions from "./Reactions";

type RepliesBoxTypes = {
  commentId: number;
};
type ReplyTypes = {
  id: number;
  comment_id: number;
  user_id: number;
  text: number;
  replyReactions: ReactionTypes;
};
type ReplyQueryData = {
  status: string;
  results: number;
  data: ReplyTypes[];
  total: number;
};

export default function RepliesBox({ commentId }: RepliesBoxTypes) {
  const api = useApi({ formData: false });
  const queryClient = useQueryClient();
  const showSuccessMessage = useSnackbarSuccess();
  const [text, setText] = useState<string>("");

  const { data, isLoading, error } = useQuery({
    queryKey: [cacheKeys.replies, commentId],
    queryFn: () => api.getReplies(commentId),
  });
  const replies: ReplyTypes[] = data?.data;
  const totalReplies: number = data?.total;

  const { mutate, isPending } = useMutation({
    mutationFn: (params: ReplyParams) => api.createReply(params),
    onSuccess: () => {
      showSuccessMessage({ message: "Comment Added" });
    },
    onSettled: (data) => {
      queryClient.setQueryData(
        [cacheKeys.replies, commentId],
        (prevData: ReplyQueryData) => {
          prevData.data.unshift(data?.reply);
          return prevData;
        }
      );
    },
  });

  const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bodyData: ReplyParams = {
      text: text,
      comment_id: commentId,
    };
    mutate(bodyData);
  };

  const handleLoadMore = () => {};

  return (
    <>
      <form onSubmit={handleCreateComment}>
        <FormControl>
          <Textarea
            placeholder="Type something here…"
            minRows={1}
            onChange={(e) => setText(e.target.value)}
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
                {isPending ? (
                  <Box sx={{ ml: "auto" }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : (
                  <Button type="submit" sx={{ ml: "auto" }}>
                    Send
                  </Button>
                )}
              </Box>
            }
            sx={{
              minWidth: 300,
            }}
          />
        </FormControl>
      </form>
      {isLoading && <LinearProgress sx={{ marginTop: "1rem" }} />}
      {error && <Typography>{error.message}</Typography>}
      {replies?.length > 0 ? (
        replies.map((reply: ReplyTypes, i: number) => {
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
                <Typography>{reply.text}</Typography>
                <Reactions size={20} reactions={reply?.replyReactions} />
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography>No Reply Available</Typography>
      )}
      <Box>
        {totalReplies > 3 && (
          <Button variant="plain" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Box>
    </>
  );
}
