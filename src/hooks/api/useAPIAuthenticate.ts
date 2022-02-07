import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { User } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { authenticateURL } from 'src/utils/url/auth.url';

const authenticate = async (): Promise<User> => {
  const response = await axiosInstance.get(authenticateURL, {
    withCredentials: true,
  });
  return response.data;
};

// NOTE: useQueryの場合はキャッシュしたりするので、この場合はトークンをキャッシュするのは良くないのでuseMutationで毎回取得するようにしている
export const useAPIAuthenticate = (
  mutationOptions?: UseMutationOptions<
    Partial<User>,
    AxiosError,
    unknown,
    unknown
  >,
) => {
  return useMutation<Partial<User>, AxiosError>(authenticate, mutationOptions);
};
