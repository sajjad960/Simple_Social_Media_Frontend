import { SnackbarProvider as NotistackProvider, useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";

interface ReactQueryProviderProps {
  children: ReactNode;
}
const CloseButton = ({ id }: { id: string | number }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      size="small"
      edge="end"
      color="inherit"
      onClick={() => closeSnackbar(id)}
    >
      <CloseIcon />
    </IconButton>
  );
};

const SnackbarProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <NotistackProvider
      hideIconVariant
      maxSnack={3}
      preventDuplicate
      dense
      action={(key) => <CloseButton key={key} id={key} />}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </NotistackProvider>
  );
};

export default SnackbarProvider;
