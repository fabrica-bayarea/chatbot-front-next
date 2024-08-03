<img src="https://utfs.io/f/3b0c82a2-c46e-4378-91c0-a19ee1e9f817-gn7svz.png" width="120px" alt="IESB University Center">

# Project Chatbot (Eda)

## Summary

This project consists of a virtual assistant to assist students, staff and other people interested in general information about IESB University Center. It uses artificial intelligence to generate automated responses and has a human interaction interface for more detailed assistance.

## Languages ​​and Technologies

- Next.js with TypeScript
- Styled Components
- LangChain.js

## Services

- OpenAI
- Resend
- supabase

## Database configuration

The chat is integrated with [supabase](https://supabase.com/) (BaaS), which uses the PostgreSQL database and its advantages, such as _views_, _procedures_, _triggers_, _Row Level Security_ (RLS), and more. Before running the application, there must be a project already configured in a supabase account and access to information such as API key and URL.

For more information, see this [repository](https://github.com/fabrica-bayarea/chatbot-dados).

## Running locally

### Clone the project

```bash
  git clone git@github.com:fabrica-bayarea/chatbot-front-next.git
```

### Change to the newly created folder

```bash
  cd chatbot-front-next
```

### Install the dependencies

```bash
  npm install
```

### Configure environment variables

Rename the `.env.example` file to `.env.local` and complete the information:

| Key                           | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | [Supabase](https://supabase.com/) project API Key      |
| NEXT_PUBLIC_SUPABASE_URL      | [Supabase](https://supabase.com/) project URL          |
| OPENAI_API_KEY                | [OpenAI](https://platform.openai.com/) API Key         |
| RESEND_API_KEY                | [Resend](https://resend.com/) API Key                  |
| UPLOADTHING_APP_ID            | [uploadthing](https://uploadthing.com/) application ID |
| UPLOADTHING_SECRET            | [uploadthing](https://uploadthing.com/) API Key        |

### Start the application

```bash
  npm run dev
```

## License

[GPL-3.0](https://github.com/fabrica-bayarea/chatbot-front-next?tab=GPL-3.0-1-ov-file#readme)

## Contributions

Before contributing, please read our [Contribution Guidelines](/doc/CONTRIBUTING.md).

## Collaborators

The list of contributors to this repository can be seen [here](https://github.com/fabrica-bayarea/chatbot-front-next/graphs/contributors).

## Translations

This document is available in other languages:

- [Português (Brasil)](/doc/translations/README_PT_BR.md)
