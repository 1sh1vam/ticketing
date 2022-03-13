import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { errors, loading, sendRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  const handleSubmit = () => {
    sendRequest();
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100 flex flex-col items-center space-y-8 justify-center">
      <div className="max-w-md w-full bg-white font-sm text-sm text-gray-800 shadow-sm px-10 py-8 rounded-lg">
        <h2 className="text-3xl mb-8 font-extrabold text-center text-gray-900">
          Sign in
        </h2>
        <div className="w-full flex font-md flex-col items-center space-y-6">
          <div className="w-full">
            <p className="text-left">Email address</p>
            <input
              className="rounded-md px-3 w-full mt-1 border border-gray-300 h-10 outline-none"
              onChange={({ target }) => setEmail(target.value)}
            />
            {errors?.email && (
              <p className="text-xs text-red-700">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <p className="text-left">Password</p>
            <input
              type="password"
              className="rounded-md px-3 w-full mt-1 border border-gray-300 h-10 outline-none"
              onChange={({ target }) => setPassword(target.value)}
            />
            {errors?.password && (
              <p className="text-xs text-red-700">{errors.password}</p>
            )}
          </div>
        </div>
        <p className="text-left mt-2 self-start">New user? <Link href="/auth/signup"><a className="text-blue-500 hover:underline">signup</a></Link></p>
        {errors?.generic && (
          <ul className="bg-red-400 mt-2 list-disc text-white rounded-md pl-8 pr-5 py-3">
            {errors.generic}
          </ul>
        )}
        <button
          className="w-full mt-10 flex items-center justify-center rounded-lg py-2 text-white text-center bg-indigo-600"
          onClick={handleSubmit}
        >
          {loading && (
            <div className="w-4 h-4 border-2 mr-2 border-t-white border-slate-300 rounded-full animate-spin"></div>
          )}
          Sign in
        </button>
      </div>
    </div>
  );
};
