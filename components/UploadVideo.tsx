import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Text,
  Progress,
  Stack,
  TextInput,
  Switch,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { ArrowBigUpLine } from 'tabler-icons-react';
import { useMutation } from 'react-query';
import { useForm } from '@mantine/form';
import { AxiosError, AxiosResponse } from 'axios';

import { updateVideo, uploadVideo } from '../api';
import { Video } from '../types';

function EditVideoForm({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  });

  type input = Parameters<typeof updateVideo>['0'];

  const mutation = useMutation<AxiosResponse<Video>, AxiosError, input>(
    updateVideo,
    {
      onSuccess: () => {
        setOpened(false);
      },
    }
  );

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutation.mutate({ videoId, ...values });
      })}
    >
      <Stack>
        <TextInput
          label='Title'
          required
          placeholder='My awesome video'
          {...form.getInputProps('title')}
        />
        <TextInput
          label='Description'
          required
          {...form.getInputProps('description')}
        />
        <Switch label='Published' {...form.getInputProps('published')} />
        <Button type='submit'>Save</Button>
      </Stack>
    </form>
  );
}

const UploadVideo = () => {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();

    formData.append('video', files[0]);
    mutation.mutate({ formData, config });
  }

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title='Upload Video'
        size='xl'
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {/* @ts-ignore */}
            {(status) => {
              return (
                <Group
                  position='center'
                  spacing='xl'
                  style={{
                    minHeight: '50vh',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to find.</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}

        {progress > 0 && (
          <Progress size='xl' label={`${progress}%`} value={progress} mb='xl' />
        )}

        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            setOpened={setOpened}
          />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
};

export default UploadVideo;
