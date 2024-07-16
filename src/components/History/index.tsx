'use client';

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { ItemDetails, List, ListItem, LoadingItem } from './History.styled';
import { deleteConversation, fetchHistory } from '@/actions/conversations';
import { TrashButton } from '@/components/Buttons';
import { DialogButton } from '@/components/styled/Button.styled';
import { Skeleton, SkeletonContainer } from '@/components/styled/Skeleton.styled';
import { useChatContext, useMainContext } from '@/hooks';
import type { Conversation } from '@/utils/definitions';

function Loading({ n }: { n: number }) {
  return (
    <List>
      {new Array(n).fill(0).map((_, i) => {
        return (
          <LoadingItem key={i}>
            <SkeletonContainer $gap="15px">
              <SkeletonContainer $gap="5px">
                <Skeleton $height="15px" $width="120px" />
                <Skeleton $height="10px" $width="80px" />
              </SkeletonContainer>
              <Skeleton $height="20px" $width="200px" />
            </SkeletonContainer>
          </LoadingItem>
        );
      })}
    </List>
  );
}

function History({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { newConversation, setConversation } = useChatContext();
  const { isLoading, setIsLoading } = useMainContext();
  const [history, setHistory] = useState<Conversation[] | undefined>(undefined);

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchHistory();

      if (data) {
        setHistory(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteConversation(id);
      setHistory(history?.filter((c) => c.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  if (history === undefined || isLoading) {
    return <Loading n={3} />;
  }

  if (history?.length === 0) {
    return (
      <List>
        <span>Não há nada aqui!</span>
        <DialogButton
          onClick={() => {
            setConversation(newConversation);
            showFn(false);
          }}
          $width="150px"
        >
          Nova conversa
        </DialogButton>
      </List>
    );
  }

  return (
    <List>
      {history?.map((conversation) => {
        const { id, messages } = conversation;
        const firstTime = new Date(messages[0].created_at).toLocaleString('pt-BR');

        return (
          <ListItem
            key={id}
            onClick={() => {
              setConversation(conversation);
              showFn(false);
            }}
            role="button"
            tabIndex={0}
          >
            <ItemDetails>
              <span>{firstTime}</span>
              <span>({messages.length} mensagens)</span>
              <span>{messages[0].content}</span>
            </ItemDetails>
            <TrashButton handleClick={() => handleDelete(id as string)} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default History;
