![Centro Universitário IESB](public/logoIesb.png)

# Projeto Chatbot / Frontend

## Resumo

Este projeto consiste em um assistente virtual para auxiliar alunos, colaboradores e demais pessoas interessandas com informações gerais sobre o Centro Universitário do IESB. Utiliza a API da OpenAI para gerar respostas automatizadas e possui interface de interação humana para atendimento mais detalhado.

## Tecnologias

- TypeScript
- Next.js
- Styled Components
- json-server

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

Renomeie o arquivo `.env.example` para `.env` e complete as informações:

JWT_SECRET_KEY

Chave aleatória para criação e validação de tokens JWT.

OPENAI_API_KEY

Chave de acesso para plataforma [OpenAI](https://platform.openai.com/).

RESEND_API_KEY

Chave de acesso para plataforma [Resend](https://resend.com/).

UPLOADTHING_APP_ID

ID da aplicação na plataforma [uploadthing](https://uploadthing.com/).

UPLOADTHING_SECRET

Chave de acesso para plataforma [uploadthing](https://uploadthing.com/).

### Inicie o json-server

```bash
  npm run server
```

### Inicie a aplicação

```bash
  npm run dev
```

## Colaboradores

- Felipe Carvalho Balbino da Silva - [GitHub](https://github.com/lipestile)
- Kaio Victor da Silva - [GitHub](https://github.com/kaiosilva17)
- Paulo Henrique Lima - [GitHub](https://github.com/limapaulobsb) | [LinkedIn](https://www.linkedin.com/in/limapaulobsb/)
