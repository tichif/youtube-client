import React from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import Head from 'next/head';
import {
  Container,
  Title,
  Paper,
  Button,
  TextInput,
  PasswordInput,
  Stack,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

import { registerUser } from '../../api';

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>['0']
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Creating Account',
        message: 'Please wait...',
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Success',
        message: 'Successfully created account',
        loading: false,
      });
      router.push('/auth/login');
    },
    onError: () => {
      updateNotification({
        id: 'register',
        title: 'Error',
        message: 'Created account failed',
        loading: false,
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label='Email'
                placeholder='jane@example.com'
                required
                {...form.getInputProps('email')}
              />
              <TextInput
                label='Username'
                placeholder='TEST'
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label='Password'
                placeholder='Password'
                required
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirm Password'
                placeholder='Confirm Password'
                required
                {...form.getInputProps('confirmPassword')}
              />
              <Button type='submit'>Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
