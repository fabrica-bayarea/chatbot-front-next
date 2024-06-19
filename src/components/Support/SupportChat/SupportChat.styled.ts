import styled from 'styled-components';

import { IconButton } from '@/components/styled';

export const Container = styled.div`
  background-image: url('/chatBg.jpg');
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);

  & form {
    margin-bottom: 40px;
    padding: 0 320px;
  }
`;

export const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 80px;
  overflow-y: scroll;
  padding: 40px 312px 0 320px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-d);
  }
`;

export const Loading = styled.div`
  display: flex;
  min-height: 40px;
`;

export const SendButton = styled(IconButton)`
  background-color: var(--clr-d);
  bottom: 30px;
  height: 60px;
  position: absolute;
  right: calc(20% - 80px);
`;
