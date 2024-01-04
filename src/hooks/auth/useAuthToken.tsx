import { JwtPayload, jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import useLocalStorageState from "use-local-storage-state"

const useAuthToken = () => {
    const [authToken, setAuthToken] = useLocalStorageState("auth-simple-social", {
        defaultValue: null
    });

    const decode: JwtPayload | null = useMemo(() => {
        return (authToken ? jwtDecode(authToken): null)
    },[authToken]);

    const isExpired = useMemo(() => {
        return decode?.exp && decode?.exp * 1000 < new Date().getTime();
    },[decode])

    const userId = useMemo(()=>decode?.sub && decode?.sub,[decode])

    return {
        authToken,
        setAuthToken,
        isExpired,
        userId
    }
}

export default useAuthToken