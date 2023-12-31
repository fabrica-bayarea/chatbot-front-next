'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DialogButton, IconButton } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import type { MessageFeedback } from '@/lib/definitions';

const Question = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  font-style: italic;
  justify-content: space-between;
`;

const Dialog = styled.div`
  background-color: var(--clr-light);
  border: 2px solid var(--clr-a);
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  gap: 10px;
  padding: 20px;
  position: relative;

  & > button {
    position: absolute;
    right: 0;
    top: 0;
  }

  & > div {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

function Feedback({ scrollFn }: { scrollFn: () => void }) {
  const { isLoading } = useMainContext();
  const { changeFeedback, changeStatus } = useChatContext();
  const [feedback, setFeedback] = useState<MessageFeedback | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const handleFeedback = async (value: MessageFeedback) => {
    if (feedback !== value) {
      const [success] = await changeFeedback(value);

      if (success) {
        setFeedback(value);
      }
    }

    setShowDialog(true);
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    scrollFn();
  }, [feedback, showDialog, scrollFn]);

  return (
    <div>
      <Question>
        <div>A resposta do assistente virtual foi satisfatória?</div>
        <IconButton
          $hover={true}
          $selected={feedback === 'good'}
          onClick={() => handleFeedback('good')}
        >
          <Image src="/thumbs_up.svg" height={18} width={18} alt="Thumbs up icon" />
        </IconButton>
        <IconButton
          $hover={true}
          $selected={feedback === 'poor'}
          onClick={() => handleFeedback('poor')}
        >
          <Image src="/thumbs_down.svg" height={18} width={18} alt="Thumbs down icon" />
        </IconButton>
      </Question>
      {showDialog && (
        <Dialog>
          <IconButton onClick={() => setShowDialog(false)} $hover={true}>
            <Image src="/xmark.svg" height={16} width={16} alt="Close icon" />
          </IconButton>
          <span>Feedback recebido!</span>
          {feedback === 'poor' && (
            <Fragment>
              <span>Gostaria de ser direcionado para um de nossos colaboradores?</span>
              <div>
                <DialogButton
                  onClick={() => changeStatus('redirected')}
                  disabled={isLoading}
                >
                  Sim
                </DialogButton>
                <DialogButton onClick={() => setShowDialog(false)} disabled={isLoading}>
                  Não
                </DialogButton>
              </div>
            </Fragment>
          )}
        </Dialog>
      )}
    </div>
  );
}

export default Feedback;
