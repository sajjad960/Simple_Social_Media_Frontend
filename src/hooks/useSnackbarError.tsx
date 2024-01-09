import { useCallback } from "react";
import { useSnackbar } from "notistack";

interface ErrorTypes {
    error: string
}

export default function useSnackbarError() {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (err: ErrorTypes) => {
      enqueueSnackbar(`${err?.error}`, {
        variant: "error",
        preventDuplicate: true,
        // persist: true,
        autoHideDuration: 5000,
      });
    },
    [enqueueSnackbar]
  );
}
