import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { Typography } from "@mui/material";
import Reactions from "./Reactions";
import RepliesModal from "./RepliesModal";

type CommentBoxPros = {
  showReplies: boolean,
}
export default function CommentBox({showReplies}: CommentBoxPros) {
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
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", p:3}}>
        <Box sx={{width: "10rem"}}>
          <Typography variant="h5" component="h5">
            Sajjad
          </Typography>
          <Typography>new Comment ,ksjdfksd lsdjflsd lkjskdlfkl</Typography>
          <Reactions size={20}/>
        </Box>
        <Box>
          {showReplies && <RepliesModal/>}
          
        </Box>
      </Box>
    </>
  );
}
