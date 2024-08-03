'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from './CookieNotice.styled';
import { getCookie, setCookie } from '@/actions/cookies';
import { DialogButton } from '@/components/styled';

function CookieNotice() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const acceptCookies = async () => {
    setIsVisible(false);
    await setCookie('notice', 'accepted');
  };

  const handleCookie = async () => {
    const cookie = await getCookie('notice');

    if (cookie !== 'accepted' && pathname !== '/suporte/privacidade') {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    handleCookie();
  }, []);

  return (
    <Container $visible={isVisible}>
      <span>
        Este site utiliza cookies para melhor experiência do usuário. Para mais
        informações, consulte nossa{' '}
        <Link href="/suporte/privacidade" target="_blank">
          Politica de privacidade.
        </Link>
      </span>
      <DialogButton onClick={acceptCookies} $width="200px">
        Entendi
      </DialogButton>
    </Container>
  );
}

export default CookieNotice;
