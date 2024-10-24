'use client';

import type { ReactNode, ChangeEvent } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { Container, Label } from './UploadButton.styled';
import { useUploadThing } from '@/utils/uploadthing';

function UploadButton({
  children,
  setFn,
}: {
  children: ReactNode;
  setFn: (value: string) => void;
}) {
  const { isUploading, startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {},
    onUploadError: () => {},
    onUploadBegin: () => {},
  });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await startUpload(Array.from(event.target.files as FileList));

    if (result) {
      setFn(result[0].url);
    }
  };

  return (
    <Container>
      <Label htmlFor="image-input">
        {isUploading ? <BeatLoader color="gray" size={6} /> : children}
      </Label>
      <input type="file" id="image-input" onChange={handleChange} />
    </Container>
  );
}

export default UploadButton;
