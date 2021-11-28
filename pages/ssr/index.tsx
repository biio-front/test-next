import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import Head from 'next/head';

import TableForm from '../../components/TableForm';
import Footer from '../../components/Footer';

import { Content } from '../../components/Table';
import styles from '../../styles/Home.module.css';

const Ssr: NextPage = () => {
  const [tableContents, setTableContents] = useState<Content[]>([]);

  useEffect(() => {
    const savedContents = localStorage.getItem('table-ssr-contents');
    const parsedContents = savedContents ? JSON.parse(savedContents) : [];
    setTableContents(parsedContents);
  }, []);

  return (
    <div>
      <Head>
        <title>getServerSideProps</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h2>This page is used by getServerSideProps 🥸</h2>

        <p className={styles.description}>
          This is page in
          <code className={styles.code}>pages/ssr/index.tsx</code>
        </p>

        <p>
          If you export an async function called getServerSideProps from a page,
          <br />
          Next.js will pre-render this page on each request using the data returned by
          getServerSideProps.
        </p>

        <TableForm tableContents={tableContents} setTableContents={setTableContents} alias='ssr' />
      </main>

      <Footer />
    </div>
  );
};

export default Ssr;