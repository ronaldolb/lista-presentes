# Lista de Presentes 💍

Lista de presentes de casamento feita em **React**, com **styled-components**, **SASS**, testes automatizados com **Jest + React Testing Library** e deploy via **Docker**.

Projeto de estudo para praticar a stack usada em portais de casamento: layout responsivo, componentes reutilizáveis, testes e containers.

## Funcionalidades

- Lista de presentes com nome, categoria e preço em reais
- Filtro por categoria e busca por nome
- Botão "Presentear" que marca o item como escolhido
- Barra de progresso com o percentual de presentes escolhidos
- Layout responsivo: 1 coluna no celular, 2 no tablet e 4 no desktop
- Acessibilidade: botões com `aria-pressed`, barra com `role="progressbar"`, foco visível

## Tecnologias

| Área | Ferramenta |
|---|---|
| Interface | React + Vite |
| Estilo por componente | styled-components (tema, props transitórias, `css` helper) |
| Estilo global | SASS (variáveis, mixins de breakpoint, `@use`) |
| Testes | Jest, React Testing Library, user-event |
| Container | Docker (build multi-stage) + Nginx |
| Versionamento | Git + Git flow |

## Como rodar

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

## Testes

```bash
npm test               # roda todos os testes
npm run test:watch     # roda a cada alteração
npm run test:coverage  # gera relatório de cobertura
```

O que é testado:

- `formatarPreco`: formatação em reais (função pura)
- `filtrarPresentes`: filtro por categoria, busca e combinação dos dois (função pura)
- `<CartaoPresente />`: renderização, clique chamando a função com o id, botão desabilitado
- `<App />`: filtro, busca, mensagem de lista vazia e atualização do progresso

## Docker

```bash
docker build -t lista-presentes .
docker run -p 8080:80 lista-presentes
# acesse http://localhost:8080
```

O `Dockerfile` tem duas etapas:

1. **build**: imagem Node instala as dependências, **roda os testes** e gera o `dist/`. Se algum teste falhar, a imagem não é criada.
2. **produção**: imagem Nginx leve, só com os arquivos estáticos. O `nginx.conf` ativa gzip, cache longo para os assets e fallback de SPA.

## Git flow

Branches usadas no projeto:

| Branch | Para quê |
|---|---|
| `main` | Código em produção. Só recebe merge de `release/*` e `hotfix/*` |
| `develop` | Integração das funcionalidades prontas |
| `feature/*` | Uma funcionalidade nova, criada a partir da `develop` |
| `release/*` | Preparação de uma versão (ajustes finais, número de versão) |
| `hotfix/*` | Correção urgente em produção, criada a partir da `main` |

### Fluxo de uma funcionalidade

```bash
# 1. Cria a feature a partir da develop
git checkout develop
git checkout -b feature/busca-presentes

# 2. Trabalha e faz commits
git add .
git commit -m "feat: adiciona campo de busca por nome"

# 3. Junta na develop (--no-ff preserva o histórico da feature)
git checkout develop
git merge --no-ff feature/busca-presentes
git branch -d feature/busca-presentes
```

### Fluxo de uma versão

```bash
git checkout develop
git checkout -b release/1.0.0
# ajustes finais...
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Versão 1.0.0"
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0
```

### Hotfix

```bash
git checkout main
git checkout -b hotfix/corrige-preco
# corrige e commita...
git checkout main && git merge --no-ff hotfix/corrige-preco
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git checkout develop && git merge --no-ff hotfix/corrige-preco
git branch -d hotfix/corrige-preco
```

Para ver o histórico com as branches:

```bash
git log --oneline --graph --all
```

## Estrutura

```
src/
├── components/        # componentes com styled-components
├── data/              # dados de exemplo
├── styles/            # SASS global + tema do styled-components
├── utils/             # funções puras (fáceis de testar)
├── __tests__/         # testes
├── App.jsx
└── main.jsx
test/                  # utilitários de teste
Dockerfile
nginx.conf
```
