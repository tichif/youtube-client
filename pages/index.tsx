import { ReactElement } from 'react';

import HomePageLayout from '../layout/Home';
import styles from '../styles/Home.module.css';

export default function Home() {
  return <div className={styles.container}></div>;
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
