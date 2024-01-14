import { useMemo } from "react";
import useAuthToken from "./auth/useAuthToken";
import ApiMethods from "../api/ApiMethods";

interface UseApiProps {
  formData: boolean
}
export default function useApi({formData}: UseApiProps) {
  const API_BASE_URL =
    import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:6006/api/v1";
  const { authToken } = useAuthToken();
  
  return useMemo(() => 
     new ApiMethods({
      baseURL: API_BASE_URL,
      formData,
      commonHeaders: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      timeout: 60000,
    }), [API_BASE_URL, authToken, formData]);
}
