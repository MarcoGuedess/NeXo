# PokePédia - Enciclopédia do Mundo Pokémon

## Descrição do Projeto

O PokePédia é uma aplicação web desenvolvida em React que permite aos usuários explorar o universo Pokémon através de consultas detalhadas, análise de batalhas e gerenciamento de itens. O sistema utiliza a PokéAPI para fornecer informações completas sobre Pokémon, incluindo stats, habilidades, movimentos, evoluções e análises estratégicas de combate.

**Principais funcionalidades:**
- Consulta detalhada de Pokémon com informações completas
- Sistema de análise de batalhas entre Pokémon
- Consulta de itens e berries
- Sistema de autenticação de usuários
- Interface responsiva e intuitiva

**Tecnologias utilizadas:**
- **React.js** – Biblioteca principal para construção da interface
- **React Router DOM** – Gerenciamento de rotas e navegação entre páginas
- **React Bootstrap** – Componentes visuais baseados no Bootstrap
- **Bootstrap** – Framework CSS para estilização responsiva
- **JavaScript (ES6+)** – Lógica da aplicação e manipulação de dados
- **Axios** – Realização de requisições HTTP (GET)
- **Vite** – Ferramenta para desenvolvimento e build de aplicações React
- **React Spinners** (Loading indicators)
- **React Icons** (Ícones)
- **Private Routes** (Proteção de rotas)
- **EmailJS** (Envio de emails)
- **PokéAPI** (Fonte de dados)
- **HTML5 & CSS3** – Estrutura e estilos personalizados
- **LocalStorage** (Persistência local)

## Instruções de Execução

### Pré-requisitos
- Node.js (versão 16.0 ou superior)
- npm ou yarn (gerenciador de pacotes)
- Navegador web moderno
- Conexão com internet (para acessar a PokéAPI)

### Instalação

1. Clone o repositório:
```bash
git clone https://gitlab.com/alunos-dfe/grupo-3-enciclopedia-pokemon.git
cd grupo-3-enciclopedia-pokemon
```

2. Instale as dependências:
```bash
npm install
npm install axios
npm install react-router-dom
npm install react-spinners
npm install react-icons
npm install --save @emailjs/browser
npm install react-scripts@latest
npm install node
```

### Execução

Para executar o projeto em modo de desenvolvimento:

```bash
npm start
```

O aplicativo estará disponível em: `http://localhost:3000`

Para fazer o build de produção:

```bash
npm run dev
```



## Integrantes do Grupo

- **Marco Antônio Clemente Ribeiro Guedes** - Matrícula: 0900065079 - Email: marcoguedes709@gmail.com

## Exemplos de Saída (JSONs de Referência)

### Exemplo 1: Dados Completos de um Pokémon

```json
{
  "pokemon": {
    "id": 25,
    "name": "pikachu",
    "height": 4,
    "weight": 60,
    "base_experience": 112,
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "electric",
          "url": "https://pokeapi.co/api/v2/type/13/"
        }
      }
    ],
    "stats": [
      {
        "base_stat": 35,
        "effort": 0,
        "stat": {
          "name": "hp"
        }
      },
      {
        "base_stat": 55,
        "effort": 0,
        "stat": {
          "name": "attack"
        }
      },
      {
        "base_stat": 90,
        "effort": 2,
        "stat": {
          "name": "speed"
        }
      }
    ],
    "abilities": [
      {
        "ability": {
          "name": "static",
          "url": "https://pokeapi.co/api/v2/ability/9/"
        },
        "is_hidden": false,
        "slot": 1
      }
    ],
    "sprites": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }
  },
  "species": {
    "name": "pikachu",
    "color": {
      "name": "yellow"
    },
    "habitat": {
      "name": "forest"
    },
    "evolution_chain": {
      "url": "https://pokeapi.co/api/v2/evolution-chain/10/"
    }
  },
  "weaknesses": ["ground"],
  "advantages": ["water", "flying"],
  "evolutions": ["pichu", "pikachu", "raichu"],
  "abilityEffects": {
    "Static": "Contact with the Pokémon may cause paralysis."
  },
  "moves": [
    {
      "nome": "thunder-shock",
      "tipo": "electric",
      "power": 40,
      "accuracy": 100,
      "pp": 30,
      "descricao": "A jolt of electricity crashes down on the target to inflict damage."
    }
  ]
}
```

### Exemplo 2: Análise de Batalha entre Pokémon

```json
{
  "statsComparison": "Charizard tem stats superiores (534 vs 320)",
  "typeAdvantage": "Charizard tem vantagem de tipo",
  "typeDetails": [
    {
      "attacker": "charizard",
      "attackerType": "fire",
      "defender": "venusaur",
      "multiplier": 2,
      "description": "Super efetivo (2x)"
    },
    {
      "attacker": "charizard",
      "attackerType": "flying",
      "defender": "venusaur",
      "multiplier": 2,
      "description": "Super efetivo (2x)"
    },
    {
      "attacker": "venusaur",
      "attackerType": "grass",
      "defender": "charizard",
      "multiplier": 0.5,
      "description": "Pouco efetivo (0,5x)"
    }
  ],
  "recommendation": "🏆 **Charizard VENCERIA** com grande vantagem! (65 vs 10 pontos)"
}
```

### Exemplo 3: Lista de Itens/Berries

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "master-ball",
      "cost": 0,
      "category": {
        "name": "pokeballs"
      },
      "effect": "Catches any wild Pokémon without fail.",
      "sprites": {
        "default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
      },
      "type": "item"
    },
    {
      "id": 1,
      "name": "cheri",
      "firmness": {
        "name": "soft"
      },
      "flavors": [
        {
          "flavor": {
            "name": "spicy"
          },
          "potency": 10
        }
      ],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png",
      "cost": 20,
      "effect": "Cures paralysis.",
      "type": "berry"
    }
  ],
  "total": 250,
  "timestamp": "2024-06-23T10:30:00Z"
}
```

### Exemplo 4: Resposta de Autenticação

```json
{
  "status": "success",
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "email": "treinador@pokemon.com",
      "nome": "Ash Ketchum"
    },
    "isAuthenticated": true,
    "loginTime": "2024-06-23T10:30:00Z"
  },
  "redirect": "/dashboard"
}
```

### Exemplo 5: Resposta de Erro da API

```json
{
  "status": "error",
  "message": "Pokémon não encontrado",
  "error_code": "POKEMON_NOT_FOUND",
  "details": {
    "searchTerm": "pokemonInexistente",
    "suggestion": "Verifique a ortografia ou tente outro nome"
  },
  "timestamp": "2024-06-23T10:30:00Z"
}
```

## Funcionalidades

### 🔍 Consulta de Pokémon
- Busca detalhada por nome ou ID
- Informações completas: stats, tipos, habilidades, movimentos
- Dados da espécie e cadeia evolutiva
- Análise de fraquezas e vantagens de tipo

### ⚔️ Sistema de Batalhas
- Comparação de stats entre dois Pokémon
- Análise de efetividade de tipos
- Algoritmo de recomendação de batalha
- Sistema de pontuação baseado em múltiplos fatores

### 🎒 Catálogo de Itens
- Lista completa de itens da PokéAPI
- Categorização por tipo (Pokéballs, Medicamentos, Berries, etc.)
- Informações de custo e efeitos
- Busca e filtros por categoria

### 🍇 Gerenciamento de Berries
- Catálogo completo de berries
- Informações de sabor, firmeza e efeitos
- Integração com dados de itens

### 🔐 Sistema de Autenticação
- Login e cadastro de treinadores
- Validação de formulários
- Persistência de sessão via LocalStorage
- Conta de teste disponível