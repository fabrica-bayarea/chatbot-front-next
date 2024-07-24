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

import React, { CSSProperties } from 'react';

import { Profile } from '@/utils/definitions';

const baseUrl = process.env.VERCEL_URL ?? '';

function EndOfSupportEmail({
  id,
  collaboratorProfile,
  ownerProfile,
}: {
  id: string;
  collaboratorProfile: Profile;
  ownerProfile: Profile;
}) {
  const avatar: CSSProperties = {
    backgroundImage: `url(${collaboratorProfile.picture})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    filter: 'grayscale(50%)',
    height: '80px',
    margin: '40px 0 20px',
    width: '80px',
  };

  const button: CSSProperties = {
    backgroundColor: '#ed2241',
    borderRadius: '4px',
    color: 'white',
    fontSize: '16px',
    marginTop: '20px',
    padding: '20px 40px',
  };

  const buttonContainer: CSSProperties = {
    backgroundColor: '#fff0f0',
    borderRadius: '16px',
    marginTop: '40px',
    padding: '40px',
  };

  const container: CSSProperties = {
    maxWidth: '600px',
  };

  const divider: CSSProperties = {
    borderColor: '#dddddd',
    margin: '20px 0',
  };

  const footer: CSSProperties = {
    marginTop: '80px',
    padding: '0 20px',
  };

  const footerLink: CSSProperties = {
    borderBottom: '1px solid #edaeda',
    color: '#edaeda',
    fontSize: '12px',
    marginRight: '20px',
  };

  const footerText: CSSProperties = {
    color: '#8898aa',
    fontSize: '12px',
  };

  const heading: CSSProperties = {
    fontSize: '28px',
    marginTop: '40px',
  };

  const introductionText: CSSProperties = {
    fontSize: '20px',
  };

  const logo = {
    marginBottom: '20px',
    opacity: 0.8,
  };

  const main: CSSProperties = {
    backgroundColor: 'white',
    fontFamily: 'Ubuntu,sans-serif',
  };

  const paragraph: CSSProperties = {
    fontSize: '16px',
    lineHeight: '26px',
  };

  return (
    <Html>
      <Head />
      <Preview>
        {collaboratorProfile.name} encerrou o atendimento ID: {id}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Olá, {ownerProfile.name}! 👋</Heading>
          <Section>
            <Row>
              <Column align="center">
                <div style={avatar}></div>
                <Text style={introductionText}>
                  {collaboratorProfile.name} encerrou o atendimento:
                </Text>
                <Text style={paragraph}>{id}</Text>
              </Column>
            </Row>
          </Section>
          <Section style={buttonContainer}>
            <Row>
              <Text style={paragraph}>
                Esperamos que esteja satifeito. Nossa equipe seguirá à disposição para
                solucionar qualquer questão que apareça no futuro.
              </Text>
              <Text style={paragraph}>
                Sua opinião é muito importante para nós! Por favor, avalie nosso
                atendimento. É bem rápido!
              </Text>
            </Row>
            <Row>
              <Column align="center">
                <Button href={`${baseUrl}/suporte/avaliacao/${id}`} style={button}>
                  Avaliar atendimento
                </Button>
              </Column>
            </Row>
          </Section>
          <Section style={footer}>
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

export default EndOfSupportEmail;
