'use client';

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { ItemDetails, List, ListItem } from './History.styled';
import { deleteConversation, fetchHistory } from '@/actions/conversations';
import { TrashButton } from '@/components/Buttons';
import { useChatContext, useMainContext } from '@/hooks';
import type { Conversation } from '@/utils/definitions';

function History({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { setConversation } = useChatContext();
  const { isLoading, setIsLoading } = useMainContext();
  const [history, setHistory] = useState<Conversation[]>([]);

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
      setHistory(history.filter((c) => c.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  if (isLoading) {
    return <BeatLoader color="lightgray" size={12} />;
  }

  if (history.length === 0) {
    return <span>Não há nada aqui!</span>;
  }

  return (
    <List>
      {history.map((conversation) => {
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
