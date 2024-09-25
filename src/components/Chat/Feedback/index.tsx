'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Dialog, QuestionContainer } from './Feedback.styled';
import { updateConversationStatus } from '@/actions/conversations';
import { updateMessageFeedback } from '@/actions/messages';
import { DialogButton, IconButton } from '@/components/styled';
import { useChatContext, useMainContext } from '@/hooks';
import type { MessageFeedback } from '@/utils/definitions';

function Feedback({ id }: { id: string }) {
  const { conversation, setConversation } = useChatContext();
  const { isLoading, setIsLoading, user } = useMainContext();
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

  const RedirectionOptions = () => {
    if (feedback === 'poor') {
      if (!user.email) {
        return (
          <>
            <span>
              Para ser atendido por nossos colaboradores, faça o{' '}
              <Link href="/login">login</Link> ou{' '}
              <Link href="/registro">registre-se.</Link>
            </span>
          </>
        );
      }

      return (
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
      );
    }
  };

  return (
    <div>
      <QuestionContainer>
        <span>A resposta do assistente foi satisfatória?</span>
        <IconButton
          $hover={true}
          $selected={feedback === 'good'}
          onClick={() => handleFeedback('good')}
        >
          <Image src="/thumbs_up.svg" height={18} width={18} alt="Feedback positivo" />
        </IconButton>
        <IconButton
          $hover={true}
          $selected={feedback === 'poor'}
          onClick={() => handleFeedback('poor')}
        >
          <Image src="/thumbs_down.svg" height={18} width={18} alt="Feedback negativo" />
        </IconButton>
      </QuestionContainer>
      {showDialog && (
        <Dialog>
          <IconButton onClick={() => setShowDialog(false)} $hover={true}>
            <Image src="/xmark.svg" height={16} width={16} alt="Fechar" />
          </IconButton>
          <span>Agradecemos o feedback!</span>
          <RedirectionOptions />
        </Dialog>
      )}
    </div>
  );
}

export default Feedback;
