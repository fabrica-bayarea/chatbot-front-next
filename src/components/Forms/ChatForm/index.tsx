import Image from 'next/image';

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container } from './ChatForm.styled';
import { AdaptiveTextArea, SendButton } from '@/components/styled';
import { useMainContext } from '@/hooks';

function ChatForm({
  action,
  maxHeight,
  background,
}: {
  action: (content: string) => void;
  maxHeight: number;
  background?: boolean;
}) {
  const { isLoading } = useMainContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textarea = textareaRef.current;

    if (!textarea?.value || isLoading) {
      return;
    }

    setContent('');

    action(textarea?.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.ctrlKey || event.shiftKey) {
        setContent(content + '\n');
      } else {
        handleSubmit(new Event('submit') as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  useEffect(() => {
    const resize = () => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';

        if (textarea.scrollHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
          textarea.style.overflowY = 'scroll';
          textarea.scrollTop = textarea.scrollHeight;
        } else {
          textarea.style.height = `${textarea.scrollHeight}px`;
          textarea.style.overflowY = 'hidden';
        }
      }
    };

    resize();
  }, [content, maxHeight]);

  return (
    <Container onSubmit={handleSubmit} $background={background}>
      <AdaptiveTextArea
        placeholder="Digite uma mensagem"
        ref={textareaRef}
        rows={1}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton type="submit">
        <Image src="/send-white.svg" height={24} width={24} alt="Enviar mensagem" />
      </SendButton>
    </Container>
  );
}

export default ChatForm;
