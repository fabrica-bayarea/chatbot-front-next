'use client';

import styled from 'styled-components';

import { LoadingAvatar } from '@/components/styled';
import { Skeleton, SkeletonContainer } from '@/components/styled/Skeleton.styled';

const LoadingHeader = styled.header`
  align-items: center;
  background-color: var(--clr-b);
  display: flex;
  gap: 20px;
  height: 120px;
  padding: 0 60px;

  @media screen and (width <= 1024px) {
    font-size: 14px;
    height: 100px;
    padding: 0 20px;
  }

  @media screen and (width <= 480px) {
    font-size: 10px;
    gap: 10px;
    height: 80px;
  }
`;

const LoadingChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 80px 20%;

  @media screen and (width <= 1024px) {
    padding: 40px 80px;
  }

  @media screen and (width <= 480px) {
    padding: 40px;
  }
`;

function Loading() {
  return (
    <section>
      <LoadingHeader>
        <LoadingAvatar $fontSize="2em" $width="3em" />
        <SkeletonContainer $gap="10px">
          <Skeleton $height="20px" $width="180px" />
          <Skeleton $height="15px" $width="100px" />
        </SkeletonContainer>
      </LoadingHeader>
      <LoadingChat>
        <SkeletonContainer $gap="10px">
          <Skeleton $height="20px" $width="60%" />
        </SkeletonContainer>
        <SkeletonContainer $gap="10px">
          <Skeleton $height="20px" $width="100%" />
          <Skeleton $height="20px" $width="100%" />
          <Skeleton $height="20px" $width="40%" />
        </SkeletonContainer>
        <SkeletonContainer $gap="10px">
          <Skeleton $height="20px" $width="100%" />
          <Skeleton $height="20px" $width="60%" />
        </SkeletonContainer>
        <SkeletonContainer $gap="10px">
          <Skeleton $height="20px" $width="100%" />
          <Skeleton $height="20px" $width="100%" />
          <Skeleton $height="20px" $width="40%" />
        </SkeletonContainer>
      </LoadingChat>
    </section>
  );
}

export default Loading;
