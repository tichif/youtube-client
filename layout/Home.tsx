import { AppShell, Navbar, Header, Box } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useMe } from '../context/me';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { user, refetch } = useMe();
  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} height={500} p='xs'>
          Side items
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          <Box>
            <Box>
              <Image src='/logo.png' alt='Logo' width={100} height={40} />
            </Box>
            {!user && (
              <>
                <Link href='/auth/login' passHref>
                  <a>Login</a>
                </Link>
                <Link href='/auth/register' passHref>
                  <a>Register</a>
                </Link>
              </>
            )}
            {user && <>Upload video</>}
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default HomePageLayout;
