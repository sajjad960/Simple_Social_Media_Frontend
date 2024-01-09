import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from './auth/useAuthToken';

const useRedirectIfTokenExists = () => {
    const {authToken} = useAuthToken()
    const navigate = useNavigate()

  useEffect(() => {
    if (authToken) {
      // Token exists, navigate to the home page or any other desired route
      navigate('/');
    }
  }, [authToken, navigate]);
};

export default useRedirectIfTokenExists;
