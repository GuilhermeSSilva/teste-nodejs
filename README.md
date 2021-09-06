<h1 align="center">Teste nodejs Locadora</h1>

<p align="center">Sistema para controle de estoque da locadora</p>

### Features

- [x] Cadastro de usuário sem senha
- [x] Cadastro de filmes
- [x] Listar filmes
- [x] Alugar filmes
- [x] Devolver filmes


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/GuilhermeSSilva/teste-nodejs.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-nodejs

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```



### Explicação das rotas

<h3>get(/doc)</h3>
  <p>Rota da documentação do swagger</p>

<h3>post(/movies)</h3>

  <p>É a rota de cadastro de filmes, todos os dados são obrigatórios, a rota espera os seguintes dados:</p>
  <ul>
    <li>title</li>
    <li>director</li>
    <li>rentValue</li>
    <li>numberCopies</li>
  </ul>

<h3>get(/movies)</h3>

  <p>É a rota de listar filmes, não necessita de nenhum dado.</p>

<h3>post(/user)</h3>

  <p>É a rota de criar usuário, todos os dados são obrigatórios, são eles:</p>
  <ul>
    <li>name</li>
    <li>cpf</li>
    <li>telephone</li>
    <li>address</li>
  </ul>
  
  
 <h3>post(/rent)</h3>

  <p>É a rota de alugar filmes, idMovies é obrigatório e nameUser ou cpfUser é obrigatório, foi feito dessa força pois nessa aplicação não está sendo usado autenticação.</p>
  <ul>
    <li>nameUser ou cpfUser</li>
    <li>idMovies</li>
  </ul>
  
  <h3>post(/returnMovies)</h3>

  <p>É a rota de devolver filmes, idMovies é obrigatório e nameUser ou cpfUser é obrigatório, foi feito dessa força pois nessa aplicação não está sendo usado autenticação.</p>
  <ul>
    <li>nameUser ou cpfUser</li>
    <li>idMovies</li>
  </ul>
  
  
  
