import axios from 'axios';
import { useCallback, useState } from 'react';
// import { useAuth } from './AuthContext';

const getBaseUrl = () => 
  process.env.REACT_APP_API_BASE_URL || 
  (window.location.hostname.includes('localhost') 
    ? 'http://localhost:8080/api/v1/' 
    : `${window.location.origin}/api/v1/`);

const BASE_URL = getBaseUrl();

const useAxios = (baseUrl = BASE_URL) => {
    const[data,setData] = useState(null);
    const[loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    // const {token} = useAuth();
    // const [token,setToken] = useState(localStorage.getItem('token'))
    // const tmpToken = token;
    const req = useCallback(
      async (method,endpoint,body = null,addHeaders = {}) => {
        setLoading(true);
        setError(null);

        try {
          const token = localStorage.getItem("jwt");
          const resp = await axios({
            method,
            url:`${baseUrl}${endpoint}`,
            data: body,
            headers:{
              'Content-Type':'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
              ...addHeaders
            },
            withCredentials: true,
          });
          setData(resp.data);
          return resp.data;
        } catch (error) {
          setError(error)
        }finally{
          setLoading(false);
        }
    },[baseUrl])
  return {data,loading,error,req};
}

export default useAxios;
