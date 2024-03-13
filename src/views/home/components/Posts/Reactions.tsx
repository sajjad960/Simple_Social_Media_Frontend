import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import { ReactionParams, ReactionTypes } from "../../../../api/Common/types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useApi from "../../../../hooks/useApi";

type ReactionProps = {
  size: number;
  reactions: ReactionTypes;
  type: string;
  id: number;
};
const Reactions = ({ size, reactions, type, id }: ReactionProps) => {
  const api = useApi({ formData: false });

  const { mutate, isPending } = useMutation({
    mutationFn: (params: ReactionParams) => api.createIncrementReact(params),
    onSuccess: (data) => {
      console.log(data);

      // showSuccessMessage({ message: "Post Created Successfully" });
      // queryClient.invalidateQueries({
      //   queryKey: [cacheKeys.posts],
      // });
    },
  });
  function handleReactions(reactName: string): void {
    const body: ReactionParams = {
      reactName,
      type,
      id
    };
    mutate(body)
  }

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
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => handleReactions("like")}
        >
          <ThumbUpIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.like ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }} onClick={() => handleReactions("haha")}>
          <EmojiEmotionsIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.haha ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }} onClick={() => handleReactions("love")}>
          <FavoriteIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.love ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }} onClick={() => handleReactions("sad")}>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.sad ?? 0}
          </p>
        </Box>
        <Box sx={{ mr: 2, cursor: "pointer" }} onClick={() => handleReactions("angry")}>
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
