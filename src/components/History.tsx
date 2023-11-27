'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import TrashButton from './TrashButton';
import { useChatContext, useMainContext } from '@/hooks';
import { mediaQueries } from '@/utils';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid var(--clr-light);
  cursor: pointer;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 20px 10px 20px 40px;

  &:hover {
    background-color: var(--clr-light);
  }

  ${mediaQueries.mobileL} {
    padding: 20px 0 20px 20px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > span:nth-child(1) {
    font-size: 0.75em;
  }

  & > span:nth-child(2) {
    font-size: 0.75em;
    margin-bottom: 5px;
  }

  & > span:nth-child(3) {
    font-size: 0.9em;
  }
`;

function History({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { history, setConversation, getHistory } = useChatContext();
  const { isLoading } = useMainContext();

  // Make the request when the component has been mounted
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
        const firstTime = new Date(messages[0].time).toLocaleString('pt-BR');

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
            <TrashButton id={id} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default History;
