import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import Reactions from "./Reactions";
import RepliesModal from "./RepliesModal";
import useApi from "../../../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cacheKeys } from "../../../../api/CacheKeys";
import {
  CommentsParams,
  ReactionTypes,
  UserDataTypes,
} from "../../../../api/Common/types";
import useSnackbarSuccess from "../../../../hooks/useSnackbarSuccess";
import { useState } from "react";

type CommentBoxPros = {
  showReplies: boolean;
  postId: number;
};
type CommentUserTypes = {
  id: number,
  name: string
}

export type CommentTypes = {
  id: number;
  post_id: number;
  text: string;
  replies_count: number | null;
  commentReactions: ReactionTypes;
  userDetailsComment: CommentUserTypes
};

export type CommentsQueryData = {
  status: string;
  results: number;
  data: CommentTypes[];
  total: number;
};

type QueryUserDataTypes = {
  data: UserDataTypes;
  status: string;
};

export default function CommentBox({ showReplies, postId }: CommentBoxPros) {
  const api = useApi({ formData: false });
  const queryClient = useQueryClient();
  const showSuccessMessage = useSnackbarSuccess();
  const [text, setText] = useState<string>("");
  const userData: QueryUserDataTypes | undefined = queryClient.getQueryData([
    cacheKeys.profile,
  ]);
  const userId = userData?.data?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: [cacheKeys.comments, postId],
    queryFn: () => api.getComments(postId),
  });
  const comments: CommentTypes[] = data?.data;
  const totalComments: number = data?.total;

  const { mutate, isPending } = useMutation({
    mutationFn: (params: CommentsParams) => api.createComments(params),
    onSuccess: (data) => {
      showSuccessMessage({ message: "Comment Added" });
      queryClient.setQueryData(
        [cacheKeys.comments, postId],
        (prevData: CommentsQueryData) => {
          const updatedComment = {
            ...data?.comment,
            commentReactions: null,
          };
          prevData.data.unshift(updatedComment);
          return prevData;
        }
      );
      setText("");
    },
  });

  const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId) {
      const bodyData: CommentsParams = {
        text: text,
        post_id: postId,
        user_id: userData?.data?.id,
      };
      mutate(bodyData);
    }

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
            value={text}
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
                  {comment.userDetailsComment.name}
                </Typography>
                <Typography>{comment.text}</Typography>
                <Reactions
                  size={20}
                  reactions={comment?.commentReactions}
                  type={"comment"}
                  id={comment?.id}
                  queryStateHelperId={postId}
                  pageNumber={null}
                />
              </Box>
              <Box>
                {showReplies && (
                  <RepliesModal
                    repliesCount={comment?.replies_count}
                    comment={comment}
                  />
                )}
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography>No Comment Available</Typography>
      )}
      <Box>
        {totalComments > 3 && (
          <Button variant="plain" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Box>
    </>
  );
}
