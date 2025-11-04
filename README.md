# ✈️ Aerocode - Sistema de Gestão para Produção de Aeronaves

Bem-vindo ao repositório oficial da **Aerocode**, uma empresa especializada no desenvolvimento de software para gestão da produção de aeronaves.

Este projeto é o nosso **Produto Mínimo Viável (MVP)**: um sistema de **Single Page Application (SPA)** robusto e eficiente, desenvolvido para simular e gerenciar as principais operações do ciclo de produção de uma aeronave.

-----

## 🎯 Sobre o Projeto

A Aerocode nasceu para atender às necessidades da indústria aeronáutica, fornecendo soluções de software para otimizar a complexa cadeia de produção.

Este SPA foi projetado com uma interface de usuário rica (UI) em React para simular a gestão de diversas áreas:

  * **Dados Mockados:** Para o propósito do MVP, todos os dados de Aeronaves, Peças, Etapas, Testes, Relatórios e Funcionários são armazenados em *mock data* (dados simulados) nos componentes React, sem persistência em banco de dados ou arquivos externos no momento.
  * **Simulação de Login:** A tela de Login usa credenciais fixas (`admin`/`1234`) para simular o acesso à área restrita.
  * **Componentes de Layout:** Utiliza um componente `Sidebar` para navegação entre as diferentes seções do sistema.
  * Documentação de WIREFRAME e WIREFLOW estão na pasta raiz em pdf.
  * (https://github.com/Templasan/AV2/blob/main/Wireframe_Wireflow.pdf)

-----

## ✨ Principais Funcionalidades (Módulos)

A aplicação inclui as seguintes páginas (rotas) de gestão:

1.  **Home (`/home`):** Painel inicial que exibe um resumo das últimas atividades e relatórios recentes.
2.  **Funcionários (`/funcionarios`):** Módulo de Gestão de Equipe (CRUD Básico de Busca/Cadastro/Edição/Deleção simulado).
3.  **Aeronaves (`/aeronaves`):** Módulo de Gestão de Aeronaves (CRUD Básico simulado) com visualização detalhada de peças, etapas e testes associados. Lida com tipos `COMERCIAL` (ex: Embraer E195-E2) e `MILITAR` (ex: Embraer KC-390).
4.  **Peças (`/pecas`):** Gerenciamento de Peças (CRUD Básico simulado), incluindo tipo (`NACIONAL`/`IMPORTADA`), fornecedor e status.
5.  **Etapas (`/etapas`):** Controle de Etapas de Produção (CRUD Básico simulado) com status (`PENDENTE`, `EM ANDAMENTO`, `CONCLUÍDA`) e associação de funcionários.
6.  **Testes (`/testes`):** Registro de Testes (CRUD Básico simulado), como `ELÉTRICO` e `HIDRÁULICO`, com resultados (`APROVADO`/`REPROVADO`) e responsável.
7.  **Relatórios (`/relatorios`):** Módulo de Relatórios (Busca/Cadastro/Deleção simulado) para acompanhar o status e o histórico de produção.

-----

## 💻 Tecnologias Utilizadas

O projeto é um frontend moderno de alto desempenho, utilizando as seguintes tecnologias:

  * **Frontend Principal:** [React](https://react.dev/)
  * **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
  * **Bundler/Dev Tool:** [Vite](https://vitejs.dev/)
  * **Roteamento:** `react-router-dom`
  * **Ícones:** [Boxicons](https://boxicons.com/)

-----

## 🔧 Pré-requisitos

Certifique-se de ter os seguintes softwares instalados para rodar o ambiente de desenvolvimento:

  * **Node.js** (versão 18.x ou superior)
  * **NPM** (vem com o Node.js) ou **Yarn**

-----

## 🚀 Manual de Instalação e Execução

Para iniciar o projeto em modo de desenvolvimento local:

```bash
# 1. Clone o repositório (ou descompacte os arquivos)
git clone <URL_DO_REPOSITORIO>

# 2. Acesse o diretório
cd av2

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Execute a aplicação em modo de desenvolvimento (Vite)
npm run dev
# ou
yarn dev
```

A aplicação estará acessível em `http://localhost:<PORTA_VITE>`.

Para construir a versão de produção:

```bash
# 5. Compile e gere os arquivos de produção
npm run build
# ou
yarn build

# 6. Para visualizar a build de produção localmente (opcional)
npm run preview
# ou
yarn preview
```
