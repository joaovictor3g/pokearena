# Apliclação - Arena Pokemon.

### Projeto
- Essa aplicação é composta por um backend em NodeJs+TypeScript e um frontend em ReactJS+TypeScript. Tem por objetivo colocar em prática os conteudos aprendidos na disciplina Fundamento de Banco de Dados.
A aplicação consiste em um CRUD de pokemon, ou seja você consegue criar um treinador, capturar um pokemon e relacionar com um único treinador, visualizar os pokemons capturados pelo treinador, modificar ou excluir um pokemon, logar com treinador já cadastrado. Essa aplicação tem como SGBD o postgreSql. O query builder [knex.js](http://knexjs.org/#Installation) que permite usar linguagem javascript nas consultas SQL. Um exemplo de consulta usando knex.js.
SELECT em um banco qualquer.
    ```const response = await knex('tabela').select('*')```
EM sql 
    ```SELECT * FROM tabela```


### Techs (Backend)
- NodeJs
- KnexJs
- TypeScript
- CORS
- AXIOS
- SGBD: PostgreSql

### Como rodar?
- Clone este repositório: `git clone https://github.com/joaovictor3g/game-pokearena`
- cd game-pokearena
- Criar database Pokemon, em qualquer ferramenta de gerenciamento de banco (PgAdmin4, Postico...).
- cd server && run `yarn knex:migrate` para rodar as migrations.
- Rode `yarn knex:rollback` caso queira excluir todas as tabelas do banco.
- Após isto no mesmo diretório rode `yarn dev`, para executar o backend da aplicação em modo de desenvolvimento. Com isso sua aplicação estará rodando no seguinte endereço: `http://localhost:3333`. Caso seja necessário testar as rotas do backend pode ser usado um software chamado Imsominia.

### Rotas (backend)

|      |Pokemon  |Trainer               |
|------|---------|----------------------|
| GET  |         |/see-your-pokemons/:id|
|POST  |         |/ && /login
|PUT   |         |/forgot-password
|DELETE|         |/delete


