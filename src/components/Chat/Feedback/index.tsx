'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { type Updater } from 'use-immer';

import { Dialog, QuestionContainer } from './Feedback.styled';
import { updateConversationStatus } from '@/actions/conversations';
import { updateMessageFeedback } from '@/actions/messages';
import { DialogButton, IconButton } from '@/components/styled';
import { useMainContext } from '@/hooks';
import type { Conversation, MessageFeedback } from '@/utils/definitions';

function Feedback({
  conversation,
  setConversation,
}: {
  conversation: Conversation;
  setConversation: Updater<Conversation>;
}) {
  const { user } = useMainContext();
  const [feedback, setFeedback] = useState<MessageFeedback | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const handleFeedback = async (value: MessageFeedback) => {
    if (feedback !== value) {
      updateMessageFeedback(conversation.id, value);
      setFeedback(value);
    }

    setShowDialog(true);
  };

  const handleStatus = async () => {
    updateConversationStatus(conversation.id, 'redirected');

    setConversation((draft) => {
      draft.status = 'redirected';
    });
  };

  const RedirectionOptions = () => {
    if (feedback === 'poor') {
      if (!user?.email) {
        return (
          <span>
            Para ser atendido por nossos colaboradores, faça o{' '}
            <Link href="/login" className="underline">
              login
            </Link>{' '}
            ou{' '}
            <Link href="/registro" className="underline">
              registre-se.
            </Link>
          </span>
        );
      }

      return (
        <>
          <span>Gostaria de ser direcionado para um de nossos colaboradores?</span>
          <div>
            <DialogButton onClick={() => handleStatus()}>Sim</DialogButton>
            <DialogButton onClick={() => setShowDialog(false)}>Não</DialogButton>
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
