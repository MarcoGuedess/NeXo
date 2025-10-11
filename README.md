# NeXo - Seu Conector de Metas e Finanças

## 📝 Descrição do Projeto

O **NeXo** é uma aplicação web em desenvolvimento, projetada para ser uma ferramenta central na vida dos usuários para o planejamento e acompanhamento de objetivos pessoais e profissionais, além de oferecer um controle financeiro integrado. A ambição do projeto é conectar as metas de vida com a saúde financeira, permitindo que os usuários estabeleçam prazos, monitorem o progresso de suas metas e gerenciem seus gastos mensais de forma inteligente.

O sistema visa não apenas registrar dados, mas também fornecer insights e dicas para ajudar os usuários a alcançarem seus objetivos de forma mais eficiente e a manterem suas finanças em ordem.

## ⚠️ Status do Projeto

**Em fase inicial de desenvolvimento.** As funcionalidades descritas abaixo representam o escopo planejado para a versão final do projeto. A estrutura do código, tecnologias e exemplos de dados estão sujeitos a alterações.

## ✨ Principais Funcionalidades (Planejadas)

### 🎯 Gestão de Metas e Objetivos

- **Criação de Metas:** Definir objetivos e metas com descrições detalhadas.
- **Prazos e Timelines:** Estabelecer datas de início e de conclusão para cada meta.
- **Acompanhamento de Progresso:** Visualizar o avanço de cada objetivo de forma clara (ex: barra de progresso).
- **Histórico e Análise:** Rever metas concluídas e analisar o desempenho em relação aos prazos propostos.

### 💰 Controle Financeiro

- **Registro de Gastos:** Anotar despesas mensais de forma simples e rápida.
- **Categorização:** Classificar gastos em categorias personalizáveis (moradia, alimentação, lazer, etc.).
- **Dashboard Financeiro:** Visualizar um resumo mensal das finanças com gráficos intuitivos.
- **Dicas e Insights:** Receber sugestões automatizadas para otimização de gastos e melhoria da saúde financeira.

## 💻 Tecnologias (Proposta Inicial)

### Frontend

- **React.js:** Biblioteca principal para a construção da interface de usuário.
- **React Router DOM:** Para gerenciamento de rotas e navegação.
- **Context API / Redux:** Para gerenciamento de estado global da aplicação.
- **Axios:** Para realizar requisições HTTP ao backend.
- **Recharts / D3.js:** Para a criação de gráficos e visualizações de dados.
- **Styled-Components / Tailwind CSS:** Para estilização moderna e responsiva.

### Backend

- **Node.js com Express.js:** Para a construção da API RESTful.

### Banco de Dados

- **PostgreSQL / MongoDB:** Para persistência dos dados dos usuários, metas e finanças.

### Ferramentas de Desenvolvimento

- **Vite / Create React App:** Para inicialização e build do projeto React.
- **Git & GitLab / GitHub:** Para controle de versão.

## 🚀 Instruções de Execução (Modelo)

Como o projeto está em fase inicial, as instruções abaixo servem como um guia padrão para um ambiente de desenvolvimento full-stack.

### Pré-requisitos

- Node.js (versão 18.0 ou superior)
- npm ou yarn
- Git

### Instalação

1. **Clone o repositório:**

```bash
git clone [URL_DO_SEU_REPOSITORIO_GIT]
cd nexo
```

2. **Instale as dependências (backend e frontend):**

```bash
# Na pasta raiz (ou na pasta /server)
npm install

# Navegue até a pasta do cliente (/client)
cd client
npm install
```

### Execução

1. **Execute o servidor backend (na pasta /server):**

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:5000` (ou outra porta definida).

2. **Execute a aplicação frontend (na pasta /client):**

```bash
npm start
```

O aplicativo estará disponível em: `http://localhost:3000`.

## 🧠 Estrutura de Dados (Exemplos Conceituais)

Abaixo estão exemplos de como os dados principais do NeXo poderão ser estruturados em formato JSON.

### Exemplo 1: Dados de uma Meta de Usuário

```json
{
  "meta": {
    "id": "meta-001",
    "userId": "user-123",
    "titulo": "Aprender a programar em Python",
    "descricao": "Concluir um curso online e desenvolver um projeto pessoal para o portfólio.",
    "dataCriacao": "2025-10-28T10:00:00Z",
    "prazoFinal": "2026-04-28T23:59:59Z",
    "status": "Em Andamento",
    "progresso": 45,
    "tags": ["educação", "carreira", "tecnologia"]
  }
}
```

### Exemplo 2: Dados de um Gasto Mensal

```json
{
  "gasto": {
    "id": "gasto-789",
    "userId": "user-123",
    "descricao": "Supermercado - Compra do mês",
    "valor": 450.75,
    "categoria": "Alimentação",
    "data": "2025-11-05T15:30:00Z",
    "tipo": "essencial"
  }
}
```

### Exemplo 3: Resposta de um Dashboard Financeiro (Agregado)

```json
{
  "dashboard": {
    "userId": "user-123",
    "mesReferencia": "Novembro/2025",
    "totalReceitas": 3500.00,
    "totalGastos": 2150.50,
    "saldoMes": 1349.50,
    "gastosPorCategoria": [
      { "categoria": "Moradia", "total": 1200.00 },
      { "categoria": "Alimentação", "total": 650.50 },
      { "categoria": "Transporte", "total": 150.00 },
      { "categoria": "Lazer", "total": 150.00 }
    ],
    "dicaDoMes": "Você gastou 10% a mais com 'Lazer' este mês. Considere buscar opções de entretenimento gratuitas para otimizar seu orçamento."
  }
}
```

## 🗺️ Próximos Passos (Roadmap)

### Fase 1 - Backend e Base de Dados

- Modelagem do banco de dados (Usuários, Metas, Gastos).
- Desenvolvimento da API RESTful com endpoints para CRUD de metas e gastos.

### Fase 2 - Frontend (Funcionalidades Essenciais)

- Implementação do sistema de autenticação de usuários (Cadastro e Login).
- Criação das telas para listar, criar, editar e excluir metas.
- Desenvolvimento da interface para registro de gastos.

### Fase 3 - Dashboards e Visualização

- Criação do dashboard de metas com barras de progresso.
- Desenvolvimento do dashboard financeiro com gráficos de gastos por categoria.

### Fase 4 - Lógica e Inteligência

- Implementação do sistema de dicas financeiras com base nos gastos.
- Criação de notificações sobre prazos de metas.

## 👤 Autor

**[Seu Nome Completo]**  
Email: [seu.email@exemplo.com]

---

## 📄 Licença

Este projeto está sob a licença [escolha uma licença - ex: MIT, GPL, etc.].

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.