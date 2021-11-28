import { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const ErrorPage: NextPage = () => (
  <main className={styles.main}>
    <h1>Page Not Found 😖</h1>
  </main>
);

export default ErrorPage;
