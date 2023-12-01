import EmailTemplate from '@/components/EmailTemplate';

export default function Teste() {
  return EmailTemplate({
    collaboratorName: 'John Doe',
    id: 'Jh9S2kc@4',
    messages: [
      {
        role: 'collaborator',
        content: 'Olá! A bandeira da Austrália é azul, vermelha e branca!',
        time: 1700596286254,
      },
    ],
    name: 'Paulo Henrique',
  });
}
