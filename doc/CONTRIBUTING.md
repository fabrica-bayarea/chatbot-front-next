# Contribution Guidelines

Thanks for your interest in contributing to the Chatbot project! We greatly appreciate your help in making this project better!

There are many ways to contribute, from writing tutorials and articles, improving documentation, submitting bug reports and feature requests, or writing code that can be incorporated into the project itself. To ensure a smooth and collaborative development experience, please review and adhere to the following contribution guidelines:

## Getting Started

- Familiarize yourself with the project's goals, documentation, and codebase. It is recommended that you read the README file and any other relevant documentation to understand the existing design, architecture, and conventions.
- Join our official [Discord channel](https://discord.gg/QKxkCrfC) to connect with team members, ask questions and coordinate efforts.
- Explore the [Issue Tracker]() to find tasks you'd like to work on or identify areas where you can contribute. If you found a bug or have a feature request, [make one]()! It's usually best to get bug confirmation or approval for the feature this way before you start coding.
- If this is your first time contributing to open source projects, look for Issues with the 'good first issue' tag. Also consider reading this series of [guides](https://opensource.guide/).

## Making Contributions

- First, make a clone of the project.
- Switch to the development branch (dev) and from there create a new branch with a name that best describes your contribution. This will help others understand the purpose of your changes.
- Make [atomic commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/) with clear and concise messages. Each commit must represent a single, complete unit of work.
- Make sure your code conforms to the project's existing code style, including indentation, variable naming conventions, and other relevant guidelines.
- Update the project's documentation if your changes affect the API, UI, or any other relevant aspect. Documentation must be clear, concise and follow the style established in the project.

## Opening Pull Requests (PRs)

- Push your branch and open a PR pointing to the main development branch (dev).
- Provide a clear, descriptive title summarizing the purpose of your changes.
- In the PR description, provide context around the problem you are addressing or the feature you are adding. Include all relevant references to Issues or Discussions.
- Don't forget to [link the PR to the corresponding Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Be receptive to feedback and interact in a timely manner with reviewers or other contributors. Address any requested changes and seek clarification if necessary.

## Conventions

### Branch naming

A git branch name should be structured as follows:

type/optional-reference/description

**Types:**

- `fix` is for bug fixing
- `feat` is for adding, refactoring or removing a feature
- `chore` is for managing the build process, dependencies, CI workflows and other auxiliary tools and libraries
- `doc` is for working on documentation
- `experimental` is for experimenting outside of an Issue

**Reference:**

The branch type may be followed by a reference to the Issue you are working on. If there is no reference, just add 'no-ref'.

**Description:**

- use descriptive names that reflect the purpose or feature of the branch
- use lowercase letters and hyphens

The reference is followed by a description summarizing the purpose of this specific branch and should be kept short and in kebab-case.

**Examples:**

```
git checkout -b fix/no-ref/fix-missing-args
git checkout -b feature/issue-14/create-user-interface
git checkout -b chore/issue-5/add-ci-workflow
```

### Commit messages

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of, such as changelog generators. This convention dovetails with [SemVer](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

type(optional scope): description

**Types:**

- A commit of the type `fix` patches a bug in the codebase (this correlates with PATCH in Semantic Versioning)
- A commit of the type `feat` introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning)
- A commit that introduces a BREAKING CHANGE must have a `!` after type/scope (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

Types other than `fix` and `feat` have no implicit effect on Semantic Versioning (unless they include a BREAKING CHANGE), but are still very important and may be one of the following:

- `refactor` is for improvements to the structure, readability or maintainability of the code
- `style` is for changes that don't affect the meaning of the code (whitespace, formatting, missing semicolons, etc)
- `chore` is for changes to core elements of the project
- `doc` is for documentation only changes

**Scope:**

A scope can be provided on the commit type to provide additional contextual information and is enclosed in parentheses.

**Description:**

- use imperative verbs that describe the action performed ('add,' 'fix,' 'update,' 'remove')
- do not capitalize the first letter
- no dot (.) at the end

**Examples:**

```
git commit -m "fix(API): fix incorrect status codes"
git commit -m "feat: add field validation"
git commit -m "chore!: drop support for Node 6"
```

Please refer to [Conventional Commits docs](https://www.conventionalcommits.org/en/) for more details.

### PR titles

Any PR that is not in draft mode must follow the Conventional Commits convention for titles.

### Style Guides

For most cases, we follow Google's Style Guides for:

- [JavaScript](https://google.github.io/styleguide/jsguide.html)
- [TypeScript](https://google.github.io/styleguide/tsguide.html)
- [Shell](https://google.github.io/styleguide/shellguide.html)

## Merging a PR

- The PRs will undergo code reviews until the required quantity is reached (2).
- Once your PR is approved, a maintainer will merge it into the main codebase.
- Now your work becomes part of the project! Thank you for your valuable contribution!

## Reviewing Contributions

- The team plays a crucial role in maintaining project quality.
- Whenever possible, do code reviews of new PRs.
- Provide feedback that will help improve the code and align it with project goals and guidelines.
- The PR will be approved as soon as it meets the established requirements.

---

Note: These contribution guidelines serve as general guidance. For specific instructions related to the project, consult the documentation, Discord channels, or consult the maintainers.

Happy contributing! We appreciate your dedication and look forward to your contributions to the Chatbot project!
