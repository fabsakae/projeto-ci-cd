# projeto-ci-cd
Conceitos sobre GitHub Actions e CI/CD.
# Projeto CI/CD com GitHub Actions e DevSecOps

Este repositório serve como um projeto de aprendizado prático para configurar um pipeline de CI/CD (Integração Contínua / Entrega Contínua) utilizando GitHub Actions, com foco na integração de práticas de DevSecOps (Segurança no Desenvolvimento).

## Objetivos do Projeto

* Configurar um ambiente de desenvolvimento local (VS Code com WSL/Ubuntu).
* Entender o fluxo de trabalho Git e GitHub (clone, commit, push).
* Criar um workflow básico no GitHub Actions para automação.
* Integrar uma ferramenta de análise de segurança estática (SAST) no pipeline.
* Aprender a depurar erros comuns em workflows de GitHub Actions.
* Verificação de Vulnerabilidades em Dependências (SCA - Software Composition Analysis) com Dependabot.

## Tecnologias Utilizadas

* **GitHub:** Plataforma de hospedagem de código e CI/CD.
* **GitHub Actions:** Ferramenta de automação de workflow.
* **VS Code:** Editor de código.
* **WSL (Windows Subsystem for Linux):** Ambiente Linux no Windows.
* **Git:** Sistema de controle de versão.
* **CodeQL:** Ferramenta de análise de segurança estática (SAST) do GitHub.
* **YAML:** Linguagem de serialização de dados para configuração de workflows.
* **Dependabot:** Ferramenta nativa do GitHub para análise de dependências (SCA).

## Passos Realizados:

O principais passos e desafios superados na configuração deste pipeline:

### 1. Configuração do Ambiente Local

1.  **Instalação e Configuração do WSL:** Garantimos que o WSL (Ubuntu) estivesse instalado e funcionando corretamente no Windows.
2.  **Instalação do Git no WSL:** Verificamos e instalamos o Git dentro do ambiente Ubuntu do WSL.
3.  **Configuração do VS Code para WSL:** Abrimos o VS Code e nos conectamos ao ambiente WSL/Ubuntu, permitindo o desenvolvimento direto no subsistema Linux.

### 2. Clonagem do Repositório

1.  **Criação do Repositório no GitHub:** Criamos o repositório `projeto-ci-cd` no GitHub.
2.  **Clonagem via VS Code:** Utilizamos o comando `Git: Clone` no VS Code para clonar o repositório para o ambiente WSL, garantindo que o projeto estivesse pronto para modificações locais.

### 3. Criação do Primeiro Workflow de CI/CD

1.  **Estrutura de Pastas:** Criamos a estrutura de pastas obrigatória para workflows do GitHub Actions: `.github/workflows/`.
2.  **Criação do Arquivo de Workflow:** Criamos o arquivo `primeiro-ci.yml` dentro da pasta `workflows`.
3.  **Definição do Workflow Básico:** Adicionamos um job simples (`hello-world-job`) que executa um comando `echo` para exibir uma mensagem, disparado em eventos de `push` e `pull_request` na branch `main`.

### 4. Depuração Inicial do Workflow

1.  **Commit e Push:** Realizamos commits e pushes sucessivos para o GitHub, aprendendo a usar o painel "Source Control" do VS Code para gerenciar as mudanças e sincronizá-las com o repositório remoto.
2.  **Verificação no GitHub Actions:** Acompanhamos as execuções do workflow na aba "Actions" do repositório no GitHub, confirmando o sucesso do `hello-world-job`.

### 5. Integração de Análise de Segurança (DevSecOps com CodeQL)

1.  **Adição de Novo Job (`analyze`):** Incluímos um novo job chamado `analyze` (CodeQL-Scan) no `primeiro-ci.yml`.
2.  **Configuração do CodeQL:**
    * Utilizamos as Actions `actions/checkout@v4`, `github/codeql-action/init@v3`, `github/codeql-action/autobuild@v3` e `github/codeql-action/analyze@v3`.
    * Definimos a linguagem de análise (`javascript` por padrão, mas configurável via `matrix`).
3.  **Depuração de Permissões:** Corrigimos um erro de permissão adicionando `permissions: contents: read` e `security-events: write` ao job `analyze
4.  **Depuração de Sintaxe YAML:** Identificamos e removemos um bloco `strategy` duplicado dentro do job `analyze`, garantindo a sintaxe correta do YAML.
5.  **Verificação na Aba Security:** Após as correções e novas execuções, confirmamos que o CodeQL rodou com sucesso e que os resultados (neste caso, "No code scanning alerts here!") foram enviados corretamente para a aba "Security" > "Code scanning alerts" do repositório.

## Como Executar o Workflow Manualmente

Você pode disparar o workflow `Meu Primeiro Workflow com GitHub Actions e SEGURANÇA!` manualmente:

1.  Vá para a aba **Actions** no seu repositório GitHub.
2.  No menu lateral esquerdo, clique em **Meu Primeiro Workflow com GitHub Actions e SEGURANÇA!**.
3.  Clique no botão **Run workflow** (Executar workflow) no canto superior direito.
4.  Selecione a branch `main` e clique em `Run workflow`.

---
## 6. Análise de Composição de Software (SCA) com Dependabot

Para garantir a segurança das dependências de terceiros utilizadas no projeto, integramos o **Dependabot**, uma ferramenta nativa do GitHub para **Análise de Composição de Software (SCA)**.

### Como funciona:

* O Dependabot monitora o arquivo `package.json` (e outros arquivos de manifesto) em busca de dependências do projeto.
* Automaticamente, ele verifica se há vulnerabilidades conhecidas em qualquer versão das dependências listadas.
* Ao detectar uma vulnerabilidade (como as encontradas no pacote `lodash` na versão `4.17.15`), o Dependabot gera um **alerta de segurança** na aba `Security` do repositório.
* Além disso, ele cria **Pull Requests (PRs)** automaticamente, propondo a atualização das dependências para versões seguras que corrigem as vulnerabilidades.
* A integração com o GitHub Actions garante que, ao mesclar esses PRs, o código seja reanalisado (CodeQL) e testado, mantendo a integridade do projeto.

### Resultados:

Com a adição intencional de uma dependência vulnerável (`lodash@4.17.15`), o Dependabot identificou com sucesso `3 alertas de segurança` relacionados a esta biblioteca. Após a mesclagem dos Pull Requests gerados pelo Dependabot, os alertas foram resolvidos e a aba `Dependabot alerts` no GitHub está agora com `0 alertas abertos`.

![closed](https://github.com/user-attachments/assets/e13f2e53-ad96-4416-8534-a64f03a45458)

Isso demonstra a capacidade do pipeline em identificar e auxiliar na remediação automatizada de vulnerabilidades em dependências.

O Dependabot alerts e Code scanning nas configurações de segurança do repositório, instruiu o GitHub a começar a escanear e a reportar vulnerabilidades por e-mail.

![alerta-dependabot](https://github.com/user-attachments/assets/3b4ea29b-8aed-4674-9a9a-206d64f877ca)

---
