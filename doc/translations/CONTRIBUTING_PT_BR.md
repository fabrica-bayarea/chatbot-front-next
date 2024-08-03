# Diretrizes de contribuição

Obrigado pelo seu interesse em contribuir com o projeto Chatbot! Agradecemos imensamente sua ajuda para tornar este projeto melhor!

Há muitas maneiras de contribuir, desde escrever tutoriais e artigos, melhorar a documentação, enviar relatórios de bugs e solicitações de recursos, ou escrever código que pode ser incorporado ao próprio projeto. Para garantir uma experiência de desenvolvimento tranquila e colaborativa, revise e siga as seguintes diretrizes de contribuição:

## Começando

- Familiarize-se com os objetivos, a documentação e a base de código do projeto. É recomendável que você leia o arquivo README e qualquer outra documentação relevante para entender o design, a arquitetura e as convenções existentes.
- Junte-se ao nosso [canal oficial do Discord](https://discord.gg/QKxkCrfC) para se conectar com membros das equipes, fazer perguntas e coordenar esforços.
- Explore as _[Issues]()_ para encontrar tarefas nas quais você gostaria de trabalhar ou identificar áreas nas quais você pode contribuir. Se você encontrou um bug ou tem uma solicitação de recurso, [crie uma]()! Geralmente, é melhor obter uma confirmação do bug ou aprovação para o recurso dessa maneira antes de começar a codar.
- Se esta é a primeira vez que você contribui para projetos de código aberto, procure _Issues_ com a tag '_good first issue_'. Considere também a leitura desta série de [guias](https://opensource.guide/pt/).

## Fazendo Contribuições

- Primeiro, faça um _clone_ do projeto.
- Mude para a _branch_ de desenvolvimento (dev) e, a partir dela, crie uma nova _branch_ com um nome que melhor descreva sua contribuição. Isso ajudará outras pessoas a entender o propósito de suas alterações.
- Faça _[atomic commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)_ com mensagens claras e concisas. Cada _commit_ deve representar uma unidade de trabalho única e completa.
- Certifique-se de que seu código esteja em conformidade com o estilo de código existente do projeto, incluindo recuo, convenções de nomenclatura de variáveis e outras diretrizes relevantes.
- Atualize a documentação do projeto se suas alterações afetarem a API, interface do usuário ou qualquer outro aspecto relevante. A documentação deve ser clara, concisa e seguir o estilo estabelecido no projeto.

## Abrindo _Pull Requests_ (PRs)

- Faça um _push_ da sua _branch_ e abra um PR apontando para a _branch_ principal de desenvolvimento (dev).
- Forneça um título claro e descritivo resumindo o objetivo de suas alterações.
- Na descrição do PR, forneça contexto sobre o problema que você está abordando ou o recurso que está adicionando. Inclua todas as referências a _Issues_ ou _Discussions_ relevantes.
- Não se esqueça de [vincular o PR à Issue](https://docs.github.com/pt/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) correspondente, se estiver resolvendo uma.
- Seja receptivo ao _feedback_ e interaja em tempo hábil com revisores ou outros colaboradores. Aborde quaisquer alterações solicitadas e busque esclarecimentos, se necessário.

## Convenções

### Nomes de _branchs_

Um nome de _branch_ deve ser estruturado da seguinte forma:

tipo/referência-opcional/descrição

**Tipos:**

- `fix` é para correção de bugs
- `feat` é para adicionar, refatorar ou remover um recurso
- `chore` é para gerenciar o processo de build, dependências, CI _workflows_ e outras ferramentas e bibliotecas auxiliares
- `doc` é para trabalhar na documentação
- `experimental` é para experimentar fora de uma _Issue_

**Referência:**

O tipo de branch pode ser seguido pela referência à Issue na qual você está trabalhando. Se não houver referência, basta adicionar 'no-ref'.

**Descrição:**

- use nomes descritivos que reflitam o propósito ou recurso da branch
- use letras minúsculas e hífens

A referência é seguida por uma descrição resumindo o objetivo desta branch específica e deve ser curta e em kebab-case.

**Exemplos:**

```
git checkout -b fix/no-ref/fix-missing-args
git checkout -b feature/issue-14/create-user-interface
git checkout -b chore/issue-5/add-ci-workflow
```

### Mensagens de _commit_

A especificação Conventional Commits é uma convenção simples para utilizar nas mensagens de _commit_. Ela fornece um conjunto fácil de regras para criar um histórico de _commit_ explícito; o que torna mais fácil a criação de ferramentas automatizadas, como geradores de changelog. Esta convenção se encaixa com o versionamento semântico ([SemVer](http://semver.org/)), descrevendo nas mensagens de commit os recursos, as correções e as grandes atualizações (_breaking changes_) feitas.

A mensagem de _commit_ deve ser estruturada da seguinte forma:

tipo(escopo opcional): descrição

**Tipos:**

- Um _commit_ do tipo `fix` corrige um bug na base de código (isso se correlaciona com PATCH em versionamento semântico)
- Um _commit_ do tipo `feat` introduz um novo recurso para a base de código (isso se correlaciona com MINOR em versionamento semântico)
- Um _commit_ que introduz uma BREAKING CHANGE deve ter um `!` após o tipo/escopo (correlacionado com MAJOR em versionamento semântico). Uma BREAKING CHANGE pode fazer parte de _commits_ de qualquer tipo.

Tipos diferentes de `fix` e `feat` não têm efeito implícito no controle de versão (a menos que incluam uma BREAKING CHANGE), mas ainda são muito importantes e podem ser um dos seguintes:

- `refactor` é para melhorias na estrutura, legibilidade ou manutenção do código
- `style` é para alterações que não afetam o significado do código (espaço em branco, formatação, ponto e vírgula, etc)
- `chore` é para mudanças em elementos centrais do projeto
- `doc` é apenas para alterações na documentação

**Escopo:**

Um escopo pode ser fornecido no tipo de _commit_ para fornecer informações contextuais adicionais e é colocado entre parênteses.

**Descrição:**

- use verbos imperativos que descrevam a ação realizada ('add', 'fix', 'update', 'remove')
- não coloque a primeira letra em maiúscula
- sem ponto (.) no final

**Exemplos:**

```
git commit -m "fix(API): fix incorrect status codes"
git commit -m "feat: add field validation"
git commit -m "chore!: drop support for Node 6"
```

Para mais detalhes, consulte essa [documentação](https://www.conventionalcommits.org/pt-br/v1.0.0/).

### Títulos de PR

Qualquer PR que não esteja em modo rascunho deve seguir a convenção Conventional Commits para os títulos.

### Guias de estilo

Na maioria dos casos, seguimos os guias de estilo da Google para:

- [JavaScript](https://google.github.io/styleguide/jsguide.html)
- [TypeScript](https://google.github.io/styleguide/tsguide.html)
- [Shell](https://google.github.io/styleguide/shellguide.html)

## _Merge_ de PRs

- Os PRs passarão por _code reviews_ até atingir a quantidade necessária (2).
- Depois que seu PR for aprovado, um mantenedor fará o _merge_ na base de código principal.
- Agora seu trabalho passa a fazer parte do projeto! Obrigado pela sua valiosa contribuição!

## Revisando Contribuições

- A equipe desempenha um papel crucial na manutenção da qualidade do projeto.
- Sempre que possível, faça _code reviews_ de novos PRs.
- Forneça _feedback_ que ajude a melhorar o código e alinhá-lo com as metas e diretrizes do projeto.
- O PR será aprovado assim que atender aos requisitos estabelecidos.

---

Nota: Estas diretrizes de contribuição servem como orientação geral. Para obter instruções específicas relacionadas ao projeto, consulte a documentação, os canais do Discord ou consulte os mantenedores.

Agora divirta-se! Agradecemos sua dedicação e esperamos suas contribuições para o projeto Chatbot!
