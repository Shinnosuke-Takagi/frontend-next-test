import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <Link href="/folder/list" passHref>
        <a>Folder List</a>
      </Link>
    </>
  );
};

export default Home;
