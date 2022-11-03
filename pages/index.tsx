import { ReactElement } from 'react';
import { useVideo } from '../context/video';
import { SimpleGrid } from '@mantine/core';

import HomePageLayout from '../layout/Home';
import styles from '../styles/Home.module.css';
import VideoTeaser from '../components/VideoTeaser';

export default function Home() {
  const { videos } = useVideo();

  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {(videos || []).map((video) => (
          <VideoTeaser key={video._id} video={video} />
        ))}
      </SimpleGrid>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
