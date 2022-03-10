import { useState } from 'react';
import axios from 'axios';
import { mapErrosArrayToObject } from '../pages/auth/utils/find-error';

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setErrors(null);
    setLoading(true);
    try {
      const response = await axios[method](url, body);
      return response;
    } catch (err) {
      const errorsObject = mapErrosArrayToObject(err.response.data.errors);
      setErrors(errorsObject);
    }
    setLoading(false);
  };

  return { errors, loading, sendRequest };
};
