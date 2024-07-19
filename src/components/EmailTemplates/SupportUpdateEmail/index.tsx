import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import * as React from 'react';

import { Message, Profile } from '@/utils/definitions';

export const SupportUpdateEmail = ({
  id,
  collaboratorProfile,
  ownerProfile,
  messages,
}: {
  id: string;
  collaboratorProfile: Profile;
  ownerProfile: Profile;
  messages: Message[];
}) => (
  <Html>
    <Head />
    <Preview>
      {collaboratorProfile.name} lhe enviou uma atualização da conversa ID: {id}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Olá, {ownerProfile.name}! 👋</Heading>
        <Section>
          <Img
            src={collaboratorProfile.picture}
            height={'80'}
            width={'auto'}
            style={{
              borderRadius: '50%',
              filter: 'grayscale(50%)',
              margin: '40px auto 20px',
            }}
          />
          <Text style={introductionText}>
            {collaboratorProfile.name} lhe enviou uma atualização de conversa.
          </Text>
        </Section>
        <Section style={conversation}>
          {messages.map(({ content, role }) => (
            <Text style={messageFrom[role]}>{content}</Text>
          ))}
        </Section>
        <Section>
          <Text style={closingText}>Atenciosamente,</Text>
          <Text style={closingText}>Equipe IESB</Text>
        </Section>
        <Section style={footer}>
          <Text style={footerText}>
            Você está recebendo este e-mail porque possui um atendimento pendente em nosso
            sistema.
          </Text>
          <Link href="/" style={footerLink}>
            Site
          </Link>
          <Link href="/" style={footerLink}>
            Política de Privacidade
          </Link>
          <Hr style={divider} />
          <Section></Section>
          <Img
            src={'https://utfs.io/f/3b0c82a2-c46e-4378-91c0-a19ee1e9f817-gn7svz.png'}
            height={50}
            width={'auto'}
            style={{
              margin: '20px 0',
              opacity: 0.8,
            }}
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

export default SupportUpdateEmail;

const closingText = {
  fontSize: '20px',
};

const container = {
  maxWidth: '600px',
};

const conversation = {
  backgroundColor: '#fff0f0',
  margin: '40px 0 20px',
  padding: '20px',
};

const divider = {
  borderColor: '#dddddd',
  marginTop: '20px',
};

const footer = {
  marginTop: '80px',
  padding: '0 20px',
};

const footerLink = {
  color: '#edaeda',
  fontSize: '12px',
  marginRight: '20px',
  borderBottom: '1px solid #edaeda',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
};

const heading = {
  fontSize: '28px',
  marginTop: '40px',
};

const introductionText = {
  fontSize: '20px',
  margin: '0 auto',
  width: 'fit-content',
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Ubuntu,sans-serif',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const message = {
  ...paragraph,
  margin: '30px 0',
  whiteSpace: 'pre-line',
};

const serviceText = {
  ...message,
  borderRadius: '8px',
  padding: '20px',
};

const messageFrom = {
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
