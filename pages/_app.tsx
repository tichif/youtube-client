import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Youtube Clone</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light' }}
      >
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            {getLayout(
              <main>
                <Component {...pageProps} />
              </main>
            )}
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
