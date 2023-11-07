import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { DropdownButton, IconButton } from './styled';
import { useChatContext, useMainContext } from '@/hooks';

const Container = styled.div`
  position: relative;
`;

const ToggleButton = styled(IconButton)`
  color: var(--clr-light);
  font-size: 2em;
  position: relative;
  z-index: 100;
`;

const Navigation = styled.nav`
  border: 1px solid var(--clr-c);
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 30px;
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  visibility: hidden;
  width: 180px;
  z-index: 10;

  ${(props) =>
    props.$visibility &&
    css`
      opacity: 1;
      top: 50px;
      visibility: visible;
    `}
`;

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { changeConversation } = useChatContext();
  const { logout } = useMainContext();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Listen for click events outside the button to close the menu
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsVisible(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Container>
      <ToggleButton type="button" onClick={() => setIsVisible(!isVisible)}>
        <FontAwesomeIcon icon={isVisible ? faClose : faBars} />
      </ToggleButton>
      <Navigation $visibility={isVisible}>
        <DropdownButton
          type="button"
          onClick={() => {
            changeConversation(null, []);
            showFn(false);
          }}
        >
          Nova conversa
        </DropdownButton>
        <DropdownButton
          type="button"
          onClick={() => {
            showFn(true);
          }}
        >
          Histórico
        </DropdownButton>
        <DropdownButton
          type="button"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          Sair
        </DropdownButton>
      </Navigation>
    </Container>
  );
}

export default Dropdown;
