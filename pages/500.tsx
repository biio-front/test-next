import { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const ErrorPage: NextPage = () => (
  <main className={styles.main}>
    <h1>Server error occurred 😖</h1>
  </main>
);

export default ErrorPage;
