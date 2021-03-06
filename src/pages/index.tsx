import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthenticate } from 'src/contexts/auth/useAuthenticate';
import { axiosInstance } from 'src/utils/url';
import { jsonHeader } from 'src/utils/url/header';

const Home: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, deauthenticate } = useAuthenticate();
  const logout = () => {
    const removeLocalStorage = async () => {
      await Promise.resolve();
      localStorage.removeItem('userToken');
      axiosInstance.defaults.headers = jsonHeader;
    };
    removeLocalStorage();
    deauthenticate();
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {isAuthenticated ? (
        <>
          <Link href="/folder/list" passHref>
            <a>Folder List</a>
          </Link>
          <Button onClick={() => logout()}>Logout</Button>
        </>
      ) : (
        <Link href="/login" passHref>
          <a>Login</a>
        </Link>
      )}
    </>
  );
};

export default Home;
