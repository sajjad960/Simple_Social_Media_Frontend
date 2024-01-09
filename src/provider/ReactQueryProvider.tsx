import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ReactQueryProviderProps {
    children: ReactNode;
  }

const ReactQueryProvider:React.FC<ReactQueryProviderProps> = ({ children }) => {
//   const onError = useSnackbarError();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
          },
          mutations: {
          },
        },
      }),
    []
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
