import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DialogButton, IconButton } from './styled';
import type { FeedbackType } from '@/types';

const Container = styled.div`
  & > div {
    display: flex;

    & > button {
      font-size: 1.2em;
      opacity: 0.25;

      &:hover,
      &.selected {
        opacity: 0.5;
      }
    }
  }
`;

const Dialog = styled.div`
  background-color: var(--clr-light);
  border: 2px solid var(--clr-a);
  flex-direction: column;
  font-size: 0.9em;
  gap: 10px;
  padding: 10px;

  & > div {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

function Feedback({ scrollFn }: { scrollFn: () => void }) {
  const [feedback, setFeedback] = useState<FeedbackType>(undefined);

  // Keeps the chat always scrolled down
  useEffect(() => {
    if (feedback) {
      scrollFn();
    }
  }, [feedback, scrollFn]);

  return (
    <Container>
      <div>
        <IconButton
          type="button"
          className={feedback === 'good' ? 'selected' : ''}
          onClick={() => {
            setFeedback('good');
          }}
        >
          <Image src="/thumbs_up.svg" height={24} width={24} alt="Thumbs up icon" />
        </IconButton>
        <IconButton
          type="button"
          className={feedback === 'poor' ? 'selected' : ''}
          onClick={() => {
            setFeedback('poor');
          }}
        >
          <Image src="/thumbs_down.svg" height={24} width={24} alt="Thumbs down icon" />
        </IconButton>
      </div>
      {feedback && (
        <Dialog>
          <span>Feedback recebido!</span>
          {feedback === 'poor' && (
            <>
              <span>Gostaria de ser direcionado para um de nossos colaboradores?</span>
              <div>
                <DialogButton type="button" disabled>
                  Sim
                </DialogButton>
                <DialogButton type="button" disabled>
                  Não
                </DialogButton>
              </div>
            </>
          )}
        </Dialog>
      )}
    </Container>
  );
}

export default Feedback;
