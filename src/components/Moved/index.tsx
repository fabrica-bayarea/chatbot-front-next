import Link from 'next/link';

import { Container } from './Moved.styled';

function Moved() {
  return (
    <Container>
      <span>Esta conversa não existe ou foi movida.</span>
      <span>(｡•́︿•̀｡)</span>
      <Link href={'/suporte'}>Página inicial</Link>
    </Container>
  );
}

export default Moved;
