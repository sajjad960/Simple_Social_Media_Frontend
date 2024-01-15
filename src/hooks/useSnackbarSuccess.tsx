import { useCallback } from "react";
import { useSnackbar } from "notistack";

interface SuccessTypes {
  message: string
}

export default function useSnackbarSuccess() {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (success: SuccessTypes) => {
      enqueueSnackbar(`${success.message}`, {
        variant: "success",
        preventDuplicate: true,
        // persist: true,
        autoHideDuration: 5000,
      });
    },
    [enqueueSnackbar]
  );
}
