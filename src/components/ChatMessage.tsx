import styled, { css } from 'styled-components';

import Styled from './styled';
import type { ChatMessageProps } from '@/lib/definitions';

const Container = styled.div<{ $right?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  & > div:first-of-type {
    left: ${({ $right }) => ($right ? 'unset' : '-20px')};
    position: absolute;
    right: ${({ $right }) => ($right ? '-20px' : 'unset')};
    top: -20px;
  }
`;

function ChatMessage({ bgColor, children, imageUrl, name, right }: ChatMessageProps) {
  return (
    <Container $right={right}>
      <Styled.Avatar $border={true} $fontSize="0.9rem" $imageUrl={imageUrl} $width="40px">
        {name?.charAt(0)}
      </Styled.Avatar>
      <Styled.ChatMessage $bgColor={bgColor} $right={right}>
        {children}
      </Styled.ChatMessage>
    </Container>
  );
}

export default ChatMessage;
