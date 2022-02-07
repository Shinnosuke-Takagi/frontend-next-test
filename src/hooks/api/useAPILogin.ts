import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { User } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { loginURL } from 'src/utils/url/auth.url';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

const login = async (
  request: LoginRequest,
): Promise<Partial<LoginResponse>> => {
  const response = await axiosInstance.post(loginURL, request, {
    withCredentials: true,
  });
  return response.data;
};

export const useAPILogin = (
  mutationOptions?: UseMutationOptions<
    Partial<LoginResponse>,
    AxiosError,
    LoginRequest,
    unknown
  >,
) => {
  return useMutation<Partial<LoginResponse>, AxiosError, LoginRequest>(
    login,
    mutationOptions,
  );
};
