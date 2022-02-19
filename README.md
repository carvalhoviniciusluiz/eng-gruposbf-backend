# Eng-Gruposbf-Backend
Este projeto está arquitetado em cima do framework **Nestjs**, [leia a documentação](https://docs.nestjs.com/) para mais detalhes.

- Conteúdo
    - [Configuração e Execução](#config)
        - [Variáveis de Ambiente](#variaveis_ambiente)
        - [Docker](#docker)
        - [Docker Run](#docker_run)
        - [Makefile](#makefile)
        - [Padrão de codificação](#padrao_codificacao)
    - [Introdução](#intro)
    - [Scripts Disponíveis](#scripts)
    - [Linguagem e Padrão de Código](#coding)
    - [Tests automatizados](#tests)
    - [Detalhes Técnicos](#detalhes_tecnicos)
        - [Regra de dependência](#dependencias)
    - [Outros Links](#outros-links)

## Configuração e Execução <a name="config"></a>
### Variáveis de Ambiente <a name="variaveis_ambiente"></a>
O projeto depende de um arquivo `.env` que deve estar na raiz. Para permitir a flexibilidade e ajuste das variáveis de ambiente em cada máquina. Este arquivo não é versionado apesar do arquivo `.env.example` ser.

Certifique-se que possui um `.env` na raiz do projeto antes de executá-lo, caso contrário, os valores padrões configurados a partir do arquivo `src/app.vars.ts` serão carregados.

```sh
# Públicas
NODE_ENV: Define o ambiente de execução. Recebe "Production" ou "Development". Controla funcionalidades da aplicação.

APP_PORT: Define a porta de acesso ao serviço.
APP_VERSION: Define a versão atual do projeto.
APP_VERSION_PREFIX: Define o prefixo da versão, default ``v``.
APP_CONTAINER_NAME: Define o nome do container que será gerado pelo docker.
```

### Docker :whale: <a name="docker"></a>
Um `Dockerfile` está presente na raiz do projeto, assim como um `docker-compose.yml` com uma configuração mínima viável para a execução do projeto.

No `docker-compose.yml` também há referência para uma rede interna que permitará conectar diversos container de serviços que venham a existir no projeto.

### Docker Run <a name="docker_run"></a>
Em uma máquina com **Docker** e **Docker Compose** instalados, basta configurar seu arquivo `.env` e executar
```bash
docker-compose up # Comando travará o terminal
# ou
docker-compose up -d # Comando executará em segundo plano
```
para iniciar a aplicação.

A execução de testes e demais comandos listados em [Scripts](#scripts) pode ser feita a partir de uma nova sessão dentro do container
```bash
docker-compose exec api /bin/bash # Inicia uma sessão dentro de um container já em execução
# ou
docker-compose run --rm api /bin/bash # Cria um container novo e inicia uma sessão
```
### Makefile <a name="makefile"></a>
Um `Makefile` está presente na raiz do projeto, o intuito é facilitar a execução dos comandos `Docker` executados a partir de um terminal de comandos
```bash
make start # Inicia o servidor do nestjs em modo debug
```
```bash
make bash # Abre o terminal interativo do container em execução
```

### Padrão de codificação <a name="padrao_codificacao"></a>
O projeto trabalha com aspas simples nas strings e ponto-e-virgula para definir o final de cada linha conforme o [padrão airbnb](https://airbnb.io/javascript/), entretanto, toda essa formatação é feita pelo prettier sempre que um arquivo é salvo.
```js
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "redhat.vscode-yaml"
  },
}
```
O projeto também conta com suportar para alias-path, a raiz `./` está configurada para o alias `~/` conforme definição
```js
// tsconfig.json
{
  "compilerOptions": {
  ...
    "paths": {
      "~/*": ["*"]
    },
  ...
  }
}
```
Para facilitar, novamente, o prettier está preparado para fornecer os imports de cada recurso nessa mesma formatação, i.e., `import { RootService } from '~/root/root.service';` conforme definição

```js
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
}
```
Configuração específica para o ambiente em Windows
```js
{
  "files.eol": "\n",
  "editor.tabSize": 2
}
```
-------------------
## Scripts <a name="scripts"></a>
Uma vez o projeto instalado os seguintes scripts estarão disponiveis para serem usados, i.e., `yarn run <SCRIPT>`

| Script | Descrição |
| ------ | ------ |
| build | Compila o projeto gerando na pasta dist os scripts para produção |
| build:tsc | Roda o compilador do typescript a partir do tsconfig.build para verificar possíveis erros |
| format | Formata automaticamente o código com o padrão definido pelo prettier |
| format:check |  |
| lint | Roda o ESLINT para conferir o styleguide do código, corrigindo automaticamente erros simples |
| start | Inicia o servidor sem hot auto-reload |
| start:dev | Inicia o servidor de desenvolvimento com hot auto-reload |
| start:debug | Inicia o servidor de desenvolvimento com hot auto-reload em modo debug |
| start:debug:docker | Usado pelo docker para iniciar o servidor de desenvolvimento em modo debug |
| start:prod | Inicia o entrypoint gerado no build em modo produção |
| test | Executa todos os testes unitários encontrados na aplicação |
| test:watch | Inicia o servidor de teste e ativa o hot auto-reload apenas para o testes modificados |
| test:ci | Gera o relatório de cobertura dos testes no código-fonte |
| test:staged | Usado com o husky para interromper o pre-commit no primeiro test que falhar |
| test:debug | Precisa que o start:dev esteja executando, levanta o modo debug nesse ambiente para uma única execução |
| test:e2e | Executa todos os testes de integração |
| test:clear | Limpa o cache de arquivos do jest |
| update:packages | Inicia uma varredura para verificar bibliotecas do sistema que estejam desatualizadas |

O comando padrão do container de desenvolvimento definido no `docker-compose.yml` é o `start:debug:docker` que já irá levantar o serviço em modo de debug caso haja necessidade desse suporte.

Tenha em vista que o container também possui o [Nest CLI](https://docs.nestjs.com/cli/overview) habilitado globalmente. Isso permite a utilização de [comandos para geração](https://docs.nestjs.com/cli/usages) de diversos recursos.
> Por padrão, todo o código-fonte é formatado ao salvar seguindo o padrão configurado no arquivo eslintrc.js.

-------------------
## Linguagem e Padrão de Código <a name="coding"></a>
Esta arquitetura utiliza [**Typescript**](https://www.typescriptlang.org/) como linguagem de codificação. Todas as features disponíveis pelo framework estão em Typescript e são altamente extensiveis, o que torna todo o código produzido super flexível para o desenvolvimento de softwares.

Apesar de adicionar uma estrutura diferente há sintaxe do javascript e que muitos programadores poderão não estar habitualidos a usar, TS trás vários benefícios a codificação:
- Suporte [intellisense](https://code.visualstudio.com/docs/editor/intellisense) para prover auto-completo, informações de parametros, informações rápidas, lista de membros, etc., tudo a nível de IDEs de código-fonte.
- Melhor tooling para debug do desenvolvedor, fazendo verificações de erros e garantias de tipagens ao codificar.
- Adição de suporte para design patterns como Abstract, Factories, Decorators, Singles, etc., para facilitar a gerência das dependências de forma padronizada e reutilizável.
- Fornece um código mais confiável e explícito, menos sucetível a erros durante a programação.
- Entre outros.

O projeto já possui um linter e o prettier configurados para garantir boa parte da formatação desejada no padrão de código definido. Arquivos de configuração `.prettierrc` e `.eslintrc.js` explicitam as configurações que dentre as poucas decisões definem: **utilização obrigatória de aspas SIMPLES** e a **não-utilização de ponto e vírgula**.

Um arquivo `.editorconfig` também dita as configurações acerca da formatação de arquivos: **identação com 2 espaços**, com **codificação em UTF-8** e com **linha em branco ao final dos arquivos**.

## Tests Automatizados <a name="tests"></a>
Com exceção dos tests de integração, os demais tests são executados em uma instancia do jest configurada via `package.json`. O jest está preparado para entender todos os alias-path existentes no projeto
```json
"jest": {
  ...
  "moduleNameMapper": {
    "~/(.*)": "<rootDir>/$1"
  }
}
```
Quando o test de cobertura for executado, arquivos da pasta `config`, ou tipo `index.ts`, `.d.ts` e outros necessários para levantar o serviço não farão parte da cobertura, conforme definição
```json
"jest": {
  ...
  "collectCoverageFrom": [
    "**/*.(t|j)s",
    "!**/*.d.ts",
    "!<rootDir>/*.ts",
    "!<rootDir>/**/index.ts",
    "!<rootDir>/**/*.module.ts",
    "!<rootDir>/config/**/*"
  ]
}
```
Quando for necessário usar o modo de debug, o programador deve optar por uma das seguintues opções para poder fazer os breakpoints no sistema

Serviço em **ambiente local** usar a opção:
```bash
Debug Server
```

Serviço rodando no **container docker** usar a opção:
```bash
Docker: Debug Server
```
-------------------
## Detalhes Técnicos <a name="detalhes_tecnicos"></a>
### Gerência de Dependências <a name="dependencias"></a>

Nestjs adota extensivamente conceitos como a **Injeção de Dependência** e a **Inversão de Controle**. `Providers` é um dos principais conceitos dentro do framework, que são basicamente classes anotadas que podem se comportar de diferentes formas (services, repositories, factories, helpers, ...).

A ideia principal é que um `provider` pode **injetar** uma ou mais dependências. O framework possui uma gerência em run-time de um design pattern bem comum, que é a de injeção de dependência. O Nest baseou-se profundamente no padrão adotado pelo Angular e pode ser melhor explorado [na sua documentação](https://angular.io/guide/dependency-injection).

> Isso permite adotar estratégias *SOLID-like* entre outras que, não necessariamente precisam ser programadas.

Nest faz uso da [estrutura de módulos](https://docs.nestjs.com/modules) para organizar seus projetos, um módulo base é encontrado dentro da pasta `src` com o nome de arquivo `app.module.ts`, todo novo módulo deve ser adicionado a sua lista de arquivos para importação.

Este projeto está configurado para trabalhar com a estrutura de módulos e um módulo `root` pode ser encontrado dentro da pasta `src` como exemplo.

## Outros Links: <a name="outros-links"></a>
  - [Providers (Nest)](https://docs.nestjs.com/providers)
  - [Circular Dependency (Nest)](https://docs.nestjs.com/fundamentals/circular-dependency)
  - [Dependency Injection & Inversion of Control (Nest)](https://docs.nestjs.com/fundamentals/custom-providers)
  - [Dependency Inversion Principle (Wikipedia)](https://en.wikipedia.org/wiki/Dependency_inversion_principle)
