import { useState } from 'react';
import axios from 'axios';
import { mapErrosArrayToObject } from '../utils/find-error';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (props = {}) => {
    setErrors(null);
    setLoading(true);
    try {
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);
      setLoading(false);

      return response;
    } catch (err) {
      const errorsObject = mapErrosArrayToObject(err.response.data.errors);
      if (errorsObject.generic.length > 0) {
        errorsObject.generic = errorsObject.generic.map((msg, idx) => <li key={`${msg}-${idx}`} className="text-inherit">{msg}</li>)
      } else {
        delete errorsObject.generic;
      }
      setErrors(errorsObject);
    }
    setLoading(false);
  };

  return { errors, loading, sendRequest };
};
