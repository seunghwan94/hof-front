import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useAuth } from './AuthContext';
const BASE_URL ='http://localhost:8080/api/v1/';

const useAxios = (baseUrl = BASE_URL) => {
    const[data,setData] = useState(null);
    const[loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const {token} = useAuth();
    // const [token,setToken] = useState(localStorage.getItem('token'))
    // const tmpToken = token;
    const req = useCallback(
      async (method,endpoint,body = null,addHeaders = {}) => {
        setLoading(true);
        setError(null);

        try {
          const resp = await axios({
            method,
            url:`${baseUrl}${endpoint}`,
            data: body,
            headers:{
              'Content-Type':'application/json',
              'Authorization' : `Bearer ${token}`,
              ...addHeaders
            }
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
