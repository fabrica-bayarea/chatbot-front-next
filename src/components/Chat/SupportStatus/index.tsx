'use client';

import Link from 'next/link';
import { PuffLoader } from 'react-spinners';

import { Container } from './SupportStatus.styled';
import { Avatar } from '@/components/styled';
import type { Support } from '@/utils/definitions';

function SupportStatus({ support }: { support: Support | null | undefined }) {
  if (support && support.status === 'closed') {
    return (
      <Container $visible={true}>
        <div>
          <span>Atendimento encerrado.</span>
          <Link href={`/suporte/avaliacao/${support.id}`} target="_blank">
            Fazer uma avaliação
          </Link>
        </div>
      </Container>
    );
  }

  if (support && support.status === 'accepted') {
    const { name, picture } = support.collaborator_profile;

    return (
      <Container $visible={true}>
        <div>
          <span>Você está conversando com:</span>
          <span>{name}</span>
        </div>
        <Avatar $fontSize="2em" $picture={picture} $width="1.75em">
          {name.charAt(0)}
        </Avatar>
      </Container>
    );
  }

  return (
    <Container $visible={!!support}>
      <div>
        <span>Aguardando um colaborador...</span>
        <span>Tempo estimado: 5 min</span>
      </div>
      <PuffLoader size={72} speedMultiplier={0.75} color="var(--clr-blue)" />
    </Container>
  );
}

export default SupportStatus;
