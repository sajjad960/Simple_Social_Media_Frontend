import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import {
  PostTypes,
  ReactionParams,
  ReactionTypes,
} from "../../../../api/Common/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../../../../hooks/useApi";
import { cacheKeys } from "../../../../api/CacheKeys";
import { useState } from "react";

type ReactionProps = {
  size: number;
  reactions: ReactionTypes;
  type: string;
  id: number;
  queryStateHelperId: number | null;
};

type PostDataType = {
  data: PostTypes[];
};
type ReactionData = {
  reaction: ReactionTypes;
};
const Reactions = ({
  size,
  reactions,
  type,
  id,
  queryStateHelperId,
}: ReactionProps) => {
  const api = useApi({ formData: false });
  const queryClient = useQueryClient();
  const [reactionName, setreactionName] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: (params: ReactionParams) => api.createIncrementReact(params),
    onSuccess: (data: ReactionData) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cachekeysName: any =
        (type === "post" && [cacheKeys.posts]) ||
        (type === "comment" && [cacheKeys.comments, queryStateHelperId]) ||
        (type === "reply" && [cacheKeys.replies, queryStateHelperId]);

      queryClient.setQueryData(cachekeysName, (prevData: PostDataType) => {
        const newUpdatedData = prevData.data.map((item: PostTypes) => {
          if (item.id === id) {
            const reactionsFieldName = `${type}Reactions`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const reactions: any = item[reactionsFieldName];

            // If No Reactions Exist
            if (reactions === null) {
              const newItemWithReactions = {
                ...item,
                [reactionsFieldName]: data.reaction,
              };
              return newItemWithReactions;
            }

            // If Reactions Exist, Need To Add Count
            if (reactions[reactionName] !== null) {
              reactions[reactionName] = reactions[reactionName]! + 1;
            } else {
              reactions[reactionName] = 1;
            }
          }
          return item;
        });

        return {
          ...prevData,
          data: newUpdatedData,
        };
      });
    },
  });
  function handleReactions(reactName: string): void {
    const body: ReactionParams = {
      reactName,
      type,
      id,
    };
    setreactionName(reactName);
    mutate(body);
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
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => handleReactions("haha")}
        >
          <EmojiEmotionsIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.haha ?? 0}
          </p>
        </Box>
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => handleReactions("love")}
        >
          <FavoriteIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.love ?? 0}
          </p>
        </Box>
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => handleReactions("sad")}
        >
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: size }} />
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }}>
            {reactions?.sad ?? 0}
          </p>
        </Box>
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => handleReactions("angry")}
        >
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
