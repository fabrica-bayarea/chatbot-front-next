![Centro Universitário IESB](public/logoIesb.png)

# Projeto Chatbot (Eda)

## Resumo

Este projeto consiste em um assistente virtual para auxiliar alunos, colaboradores e demais pessoas interessandas com informações gerais sobre o Centro Universitário do IESB. Utiliza inteligência artificial para gerar respostas automatizadas e possui interface de interação humana para atendimento mais detalhado.

## Linguagens e Tecnologias

- Next.js com TypeScript
- Styled Components
- LangChain.js

## Serviços

- OpenAI
- Resend
- supabase

## Configuração do banco de dados

O chat é integrado com o [supabase](https://supabase.com/) (BaaS), que utiliza banco de dados PostgreSQL e suas vantagens, como _views_, _procedures_ e _triggers_. Antes de rodar a aplicação, deve haver um projeto já configurado em uma conta do supabase e acesso à informações como chave de API e URL.

~~Para mais orientações, veja este repositório.~~

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

### Configure as varáveis de ambiente

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

Antes de contribuir, leia nossas [Diretrizes de contribuição](https://github.com/fabrica-bayarea/chatbot-front-next/blob/dev/doc/translations/CONTRIBUTING_PT_BR.md).

## Colaboradores

- Felipe Carvalho Balbino da Silva - [GitHub](https://github.com/lipestile)
- Kaio Victor da Silva - [GitHub](https://github.com/kaiosilva17)
- Paulo Henrique Lima - [GitHub](https://github.com/limapaulobsb) | [LinkedIn](https://www.linkedin.com/in/limapaulobsb/)
