import { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Footer: NextPage = () => (
  <footer className={styles.footer}>
    <a href='#' rel='noopener noreferrer'>
      Created by <span className={styles.logo}>biio-front</span>
    </a>
  </footer>
);

export default Footer;
