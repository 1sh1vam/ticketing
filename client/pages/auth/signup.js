import { useState } from 'react';
import axios from 'axios';
import { errorExists, mapErrosArrayToObject } from './utils/find-error';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null)

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log('response', response.data);
    } catch (err) {
      console.log('error', err.response);
      const errorsObject = mapErrosArrayToObject(err.response.data.errors);
      console.log('eeror d', errorsObject);
      setErrors(errorsObject);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center space-y-8 justify-center">
      <div className="max-w-md w-full bg-white font-sm text-sm text-gray-800 shadow-sm px-10 py-8 rounded-lg">
        <h2 className="text-3xl mb-8 font-extrabold text-center text-gray-900">
            Sign up
        </h2>
        <div className="w-full flex font-md flex-col items-center space-y-6">
          <div className="w-full">
            <p className="text-left">Email address</p>
            <input
              className="rounded-md px-3 w-full mt-1 border border-gray-300 h-10 outline-none"
              onChange={({ target }) => setEmail(target.value)}
             />
             {errors?.email && <p className="text-xs text-red-700">{errors.email}</p>}
          </div>
          <div className="w-full">
            <p className="text-left">Password</p>
            <input
              type="password"
              className="rounded-md px-3 w-full mt-1 border border-gray-300 h-10 outline-none"
              onChange={({ target }) => setPassword(target.value)}
            />
            {errors?.password && <p className="text-xs text-red-700">{errors.password}</p>}
          </div>
        </div>
        <button
          className="w-full mt-10 rounded-lg py-2 text-white text-center bg-indigo-600"
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};
