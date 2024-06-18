'use client';

import { ReactNode, type ChangeEvent } from 'react';
import { useUploadThing } from '@/utils/uploadthing';

import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

const Container = styled.div`
  display: flex;

  & > input {
    display: none;
  }
`;

const Label = styled.label`
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 80px;
`;

function UploadButton({
  children,
  setFn,
}: {
  children: ReactNode;
  setFn: (value: string) => void;
}) {
  const { isUploading, permittedFileInfo, startUpload } = useUploadThing(
    'imageUploader',
    {
      onClientUploadComplete: () => {},
      onUploadError: () => {},
      onUploadBegin: () => {},
    }
  );

  // console.log(permittedFileInfo);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await startUpload(Array.from(event.target.files as FileList));
    setFn(result[0].url);
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
