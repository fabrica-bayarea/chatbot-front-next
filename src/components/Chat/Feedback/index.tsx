'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Dialog, Question } from './Feedback.styled';
import { updateConversationStatus } from '@/actions/conversations';
import { updateMessageFeedback } from '@/actions/messages';
import { DialogButton, IconButton } from '@/components/styled';
import { useChatContext, useMainContext } from '@/hooks';
import type { MessageFeedback } from '@/utils/definitions';

function Feedback({ id }: { id: string }) {
  const { conversation, setConversation } = useChatContext();
  const { isLoading, setIsLoading } = useMainContext();
  const [feedback, setFeedback] = useState<MessageFeedback | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const handleFeedback = async (value: MessageFeedback) => {
    if (feedback !== value) {
      try {
        setIsLoading(true);
        await updateMessageFeedback(id, value);
        setFeedback(value);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    setShowDialog(true);
  };

  const handleStatus = async () => {
    try {
      setIsLoading(true);

      await updateConversationStatus(conversation.id, 'redirected');

      setConversation({ ...conversation, status: 'redirected' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <>
              <span>Gostaria de ser direcionado para um de nossos colaboradores?</span>
              <div>
                <DialogButton onClick={() => handleStatus()} disabled={isLoading}>
                  Sim
                </DialogButton>
                <DialogButton onClick={() => setShowDialog(false)} disabled={isLoading}>
                  Não
                </DialogButton>
              </div>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}

export default Feedback;
