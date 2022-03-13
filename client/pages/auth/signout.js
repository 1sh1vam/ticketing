import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

export default () => {
  const router = useRouter();
  const { errors, sendRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      router.push('/');
    },
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return errors?.generic ? (
    <ul className="text-sm text-white bg-red-400 rounded-md p-5">
      {errors?.generic}
    </ul>
  ) : (
    <p className="text-md p-5">Signing out...</p>
  );
};
