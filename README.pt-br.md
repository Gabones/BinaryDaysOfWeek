# Binary Days of the Week

Este projeto é um exemplo educacional que demonstra como usar a representação binária de números para representar dias válidos de uma semana. A ideia principal é utilizar os bits de um número binário para indicar os dias da semana, onde cada bit representa um dia específico.

## Representação Binária dos Dias da Semana

Cada dia da semana é representado por um bit em um número binário de 8 bits:

- **1** (00000001) = Domingo
- **2** (00000010) = Segunda-feira
- **4** (00000100) = Terça-feira
- **8** (00001000) = Quarta-feira
- **16** (00010000) = Quinta-feira
- **32** (00100000) = Sexta-feira
- **64** (01000000) = Sábado

Para combinar múltiplos dias, basta somar os valores correspondentes. Por exemplo:

- Segunda-feira (2) + Quarta-feira (8) = **10** (00001010)

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

### Backend

O backend é implementado em C# com ASP.NET Core e utiliza o Entity Framework Core para persistência de dados. Ele fornece uma API para gerenciar diferentes representações de dias da semana:

- **SchedulerBinaryEncoded**: Representação binária dos dias.
- **SchedulerEnum**: Representação usando enums.
- **SchedulerStringArray**: Representação usando arrays de strings.

#### Endpoints Principais

- **CRUD para SchedulerBinaryEncoded**: `/SchedulerBinaryEncoded`
- **CRUD para SchedulerEnum**: `/SchedulerEnum`
- **CRUD para SchedulerStringArray**: `/SchedulerStringArray`

#### Configuração

O backend utiliza PostgreSQL como banco de dados. Para configurar o ambiente de desenvolvimento, edite o arquivo `appsettings.Development.json` com as credenciais do banco.

### Frontend

O frontend é implementado em React com TypeScript e utiliza Material-UI para a interface do usuário. Ele fornece uma interface para visualizar e manipular os dados do backend.

#### Funcionalidades

- **CRUD**: Interface para gerenciar tabelas de dados.
- **Tabela Binária**: Exibição de números binários e sua relação com os dias da semana.

## Como Executar

### Pré-requisitos

- Docker e Docker Compose
- Node.js e npm
- .NET SDK 9.0 ou superior

### Passos

1. **Subir o Banco de Dados**:
   ```bash
   docker-compose up -d
   ```
2. **Executar o Backend**:
    ```bash
    dotnet watch run
    ```
3. **Executar o Frontend**:
    ```bash
    yarn install
    yarn dev
    ```

### Tecnologias Utilizadas

- Backend:
    - ASP.NET Core
    - Entity Framework Core
    - PostgreSQL
- Frontend
    - React
    - Typescript
    - Material UI
    - TanStack Query
- Infraestrutura
    - Docker
    - Docker Compose