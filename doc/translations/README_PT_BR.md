<img src="https://utfs.io/f/3b0c82a2-c46e-4378-91c0-a19ee1e9f817-gn7svz.png" width="120px" alt="Centro Universitário IESB">

# Projeto Chatbot (Eda)

## Resumo

Este projeto consiste em um assistente virtual para auxiliar alunos, colaboradores e demais pessoas interessandas em informações gerais sobre o Centro Universitário do IESB. Utiliza inteligência artificial para gerar respostas automatizadas e possui interface de interação humana para atendimento mais detalhado.

## Linguagens e Tecnologias

- Next.js com TypeScript
- Styled Components
- LangChain.js

## Serviços

- OpenAI
- Resend
- supabase

## Configuração do banco de dados

O chat é integrado com o [supabase](https://supabase.com/) (BaaS), que utiliza banco de dados PostgreSQL e suas vantagens, como _views_, _procedures_, _triggers_, _Row Level Security_ (RLS), e mais. Antes de rodar a aplicação, deve haver um projeto já configurado em uma conta do supabase e acesso à informações como chave de API e URL.

Para mais orientações, veja esse [repositório](https://github.com/fabrica-bayarea/chatbot-dados).

## Rodando localmente

### Clone o projeto

```bash
  git clone git@github.com:fabrica-bayarea/chatbot-front-next.git
```

### Mude para a pasta recém-criada

```bash
  cd chatbot-front-next
```

### Instale as dependências

```bash
  npm install
```

### Configure as variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env.local` e complete as informações:

| Chave                         | Descrição                                                 |
| ----------------------------- | --------------------------------------------------------- |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Chave de API do projeto [supabase](https://supabase.com/) |
| NEXT_PUBLIC_SUPABASE_URL      | URL do projeto [supabase](https://supabase.com/)          |
| OPENAI_API_KEY                | Chave de API [OpenAI](https://platform.openai.com/)       |
| RESEND_API_KEY                | Chave de API [Resend](https://resend.com/)                |
| UPLOADTHING_APP_ID            | ID de aplicação [uploadthing](https://uploadthing.com/)   |
| UPLOADTHING_SECRET            | Chave de API [uploadthing](https://uploadthing.com/)      |

### Inicie a aplicação

```bash
  npm run dev
```

## Licença

[GPL-3.0](https://github.com/fabrica-bayarea/chatbot-front-next?tab=GPL-3.0-1-ov-file#readme)

## Contribuições

Antes de contribuir, leia nossas [Diretrizes de contribuição](/doc/translations/CONTRIBUTING_PT_BR.md).

## Colaboradores

A lista de colaboradores deste repositório pode ser vista [aqui](https://github.com/fabrica-bayarea/chatbot-front-next/graphs/contributors).

## Translations

Este documento está disponível em outros idiomas:

- [English](/README.md)
