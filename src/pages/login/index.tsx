import { useAPILogin } from '@/hooks/api/useAPILogin';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useAuthenticate } from 'src/contexts/auth/useAuthenticate';
import { axiosInstance } from 'src/utils/url';
import { loginSchema } from 'src/utils/validation/authSchema';

const Login = () => {
  const router = useRouter();
  const { authenticate } = useAuthenticate();
  const asyncLocalStorage = {
    setItem: async (key: string, value: string) => {
      return Promise.resolve().then(() => {
        localStorage.setItem(key, value);
      });
    },
    getItem: async (key: string): Promise<string> => {
      return Promise.resolve().then(() => {
        return localStorage.getItem(key) || '';
      });
    },
  };
  const { mutate: mutateLogin } = useAPILogin({
    onSuccess: (data) => {
      authenticate();
      asyncLocalStorage
        .setItem('userToken', data.token || '')
        .then(() => {
          return asyncLocalStorage.getItem('userToken');
        })
        .then((token) => {
          if (token) {
            axiosInstance.defaults.headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            };
            router.push('/');
          }
        });
    },
    onError: (e) => {
      alert('認証に失敗しました。');
    },
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => mutateLogin(values),
  });

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        type="button"
        onClick={() => handleSubmit()}>
        ログイン
      </Button>
    </>
  );
};

export default Login;
