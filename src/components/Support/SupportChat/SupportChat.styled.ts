import styled from 'styled-components';

import { Form, IconButton } from '@/components/styled';

export const ChatForm = styled(Form)`
  height: 160px;
  padding: 0 280px 40px;

  & > div {
    position: relative;
  }

  @media screen and (width <= 1440px) {
    padding: 0 120px 40px;
  }

  @media screen and (width <= 1024px) {
    padding: 0 40px 40px;
  }
`;

export const Container = styled.div`
  background-image: url('/chatBg.jpg');
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  height: calc(100vh - 150px);
`;

export const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 80px;
  overflow-y: scroll;
  padding: 40px 274px 0 280px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-d);
  }

  @media screen and (width <= 1440px) {
    padding: 40px 114px 0;
  }

  @media screen and (width <= 1024px) {
    padding: 40px 36px 0;
  }
`;

export const Loading = styled.div`
  display: flex;
  min-height: 40px;
`;

export const SendButton = styled(IconButton)`
  background-color: var(--clr-c);
  height: 60px;
  position: absolute;
  right: -90px;
  top: 30px;

  @media screen and (width <= 1024px) {
    right: -30px;
    top: -30px;
  }
`;
