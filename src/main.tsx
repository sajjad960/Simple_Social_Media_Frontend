import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactQueryProvider from "./provider/ReactQueryProvider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SnackbarProvider from "./provider/SnackbarProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <ReactQueryProvider>
        <App />
        <ReactQueryDevtools />
      </ReactQueryProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
