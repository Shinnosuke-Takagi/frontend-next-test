import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAuthenticate } from 'src/contexts/auth/useAuthenticate';
import { axiosInstance } from 'src/utils/url';
import { jsonHeader } from 'src/utils/url/header';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, deauthenticate } = useAuthenticate();
  const logout = () => {
    const removeLocalStorage = async () => {
      await Promise.resolve();
      localStorage.removeItem('userToken');
    };
    removeLocalStorage();
    deauthenticate();
    axiosInstance.defaults.headers = jsonHeader;
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
