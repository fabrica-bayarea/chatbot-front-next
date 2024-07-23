import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

import * as React from 'react';

import { Message, Profile } from '@/utils/definitions';

const baseUrl = process.env.VERCEL_URL ?? '';

function SupportUpdateEmail({
  id,
  collaboratorProfile,
  ownerProfile,
  messages,
}: {
  id: string;
  collaboratorProfile: Profile;
  ownerProfile: Profile;
  messages: Message[];
}) {
  const avatar: React.CSSProperties = {
    backgroundImage: `url(${collaboratorProfile.picture})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    filter: 'grayscale(50%)',
    height: '80px',
    margin: '40px 0 20px',
    width: '80px',
  };

  const button: React.CSSProperties = {
    backgroundColor: '#ed2241',
    borderRadius: '4px',
    color: 'white',
    fontSize: '16px',
    padding: '20px 40px',
  };

  const buttonContainer: React.CSSProperties = {
    margin: '80px 0',
  };

  const closingText: React.CSSProperties = {
    fontSize: '20px',
  };

  const container: React.CSSProperties = {
    maxWidth: '600px',
  };

  const conversation: React.CSSProperties = {
    backgroundColor: '#fff0f0',
    margin: '40px 0 20px',
    padding: '20px',
  };

  const divider: React.CSSProperties = {
    borderColor: '#dddddd',
    margin: '20px 0',
  };

  const footer: React.CSSProperties = {
    padding: '0 20px',
  };

  const footerLink: React.CSSProperties = {
    borderBottom: '1px solid #edaeda',
    color: '#edaeda',
    fontSize: '12px',
    marginRight: '20px',
  };

  const footerText: React.CSSProperties = {
    color: '#8898aa',
    fontSize: '12px',
  };

  const heading: React.CSSProperties = {
    fontSize: '28px',
    marginTop: '40px',
  };

  const introductionText: React.CSSProperties = {
    fontSize: '20px',
  };

  const logo = {
    marginBottom: '20px',
    opacity: 0.8,
  };

  const main: React.CSSProperties = {
    backgroundColor: 'white',
    fontFamily: 'Ubuntu,sans-serif',
  };

  const paragraph: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '26px',
  };

  const message: React.CSSProperties = {
    ...paragraph,
    margin: '30px 0',
    whiteSpace: 'pre-line',
  };

  const serviceText = {
    ...message,
    borderRadius: '8px',
    padding: '20px',
  };

  const messageFrom: {
    user: React.CSSProperties;
    assistant: React.CSSProperties;
    collaborator: React.CSSProperties;
  } = {
    user: {
      ...message,
    },
    assistant: {
      ...serviceText,
      backgroundColor: '#f0e4e4',
    },
    collaborator: {
      ...serviceText,
      backgroundColor: '#f0d4d4',
    },
  };

  return (
    <Html>
      <Head />
      <Preview>
        {collaboratorProfile.name} lhe enviou uma atualização da conversa ID: {id}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Olá, {ownerProfile.name}! 👋</Heading>
          <Section>
            <Row>
              <Column align="center">
                <div style={avatar}></div>
                <Text style={introductionText}>
                  {collaboratorProfile.name} lhe enviou uma atualização de conversa.
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={conversation}>
            {messages.map(({ content, role }, i) => (
              <Text key={i} style={messageFrom[role]}>
                {content}
              </Text>
            ))}
          </Section>
          <Section>
            <Text style={closingText}>Atenciosamente,</Text>
            <Text style={closingText}>Equipe IESB</Text>
          </Section>
          <Section style={buttonContainer}>
            <Row>
              <Column align="center">
                <Text style={paragraph}>
                  Se estiver satisfeito, você pode encerrar este atendimento e fazer uma
                  avaliação.
                </Text>
                <Button href={`${baseUrl}/suporte/avaliacao/${id}`} style={button}>
                  Encerrar atendimento
                </Button>
              </Column>
            </Row>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>
              Você está recebendo este e-mail porque possui um atendimento pendente em
              nosso sistema.
            </Text>
            <Link href={baseUrl} style={footerLink}>
              Site
            </Link>
            <Link href={`${baseUrl}/suporte/privacidade`} style={footerLink}>
              Política de Privacidade
            </Link>
            <Hr style={divider} />
            <Img
              src={'https://utfs.io/f/3b0c82a2-c46e-4378-91c0-a19ee1e9f817-gn7svz.png'}
              height={50}
              width={50}
              style={logo}
            />
            <Text style={footerText}>Centro Universitário IESB</Text>
            <Text style={footerText}>
              SGAS Quadra 613/614, Via L2 Sul - Asa Sul, Brasília - DF, 70200-730
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default SupportUpdateEmail;
