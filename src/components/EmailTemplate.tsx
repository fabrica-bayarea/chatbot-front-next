import { EmailTemplateProps } from '@/lib/definitions';
import LineBreaks from './LineBreaks';

function EmailTemplate({ collaboratorName, id, messages, name }: EmailTemplateProps) {
  const style = {
    hr: {
      backgroundColor: 'gray',
      border: 'none',
      marginTop: '40px',
      minHeight: '1px',
    },
  };

  return (
    <main>
      <h1>Olá, {name}! 👋</h1>
      {messages.map(({ content }, index) => (
        <p key={index}>
          <LineBreaks content={content} />
        </p>
      ))}
      <p>{`Atenciosamente, ${collaboratorName}.`}</p>
      <hr style={style.hr} />
      <p>{`Esta resposta foi gerada a partir da conversa ID: ${id}`}</p>
      <p>Chatbot Inc.</p>
    </main>
  );
}

export default EmailTemplate;
