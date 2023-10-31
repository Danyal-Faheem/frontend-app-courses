import { useState, useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';

const useFetch = ({ url, params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    axios
      .get(`${getConfig().LMS_BASE_URL}/${url}`, { params })
      .then((response) => {
        console.log(response);
        setResponse(response.data.results);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [url]);
  return {
    response,
    isLoading,
    error,
  };
};

export default useFetch;
