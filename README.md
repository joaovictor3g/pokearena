# Apliclação - Arena Pokemon.

### Projeto
- Essa aplicação é composta por um backend em NodeJs+TypeScript e um frontend em ReactJS+TypeScript. Tem por objetivo colocar em prática os conteudos aprendidos na disciplina Fundamento de Banco de Dados.
A aplicação consiste em um CRUD de pokemon, ou seja você consegue criar um treinador, capturar um pokemon e relacionar com um único treinador, visualizar os pokemons capturados pelo treinador, modificar ou excluir um pokemon, logar com treinador já cadastrado, cadastrar uma imagem de perfil para o treinador. Essa aplicação tem como SGBD o postgreSql. O query builder [knex.js](http://knexjs.org/#Installation) que permite usar linguagem javascript nas consultas SQL. Um exemplo de consulta usando knex.js.

    SELECT em um banco qualquer.
    ```JS
        const response = await knex('tabela').select('*')
    ```

    EM sql 
    ```SQL
        SELECT * FROM tabela
    ```
    Criação de tabela no knex
    ```JS
        import Knex from 'knex';

        export async function up(knex: Knex) {
            return knex.schema.createTable('pokemon', table => {
                table.integer('id_pokemon').primary().notNullable();
                table.string('name').notNullable();
                table.string('image').notNullable();
                table.string('description').notNullable();
            });
        }

        export async function down(knex: Knex) {
            return knex.schema.dropTable('pokemon');
        }
    ```

### Techs (Backend)
- NodeJs
- KnexJs
- TypeScript
- CORS
- AXIOS
- SGBD: PostgreSql

### Modelagem do banco
Veja a modelagem [aqui](https://raw.githubusercontent.com/joaovictor3g/game-pokearena/master/assets/modelagem.svg)

### Como rodar?
- Clone este repositório: `git clone https://github.com/joaovictor3g/game-pokearena`
- cd game-pokearena
- Criar database Pokemon, em qualquer ferramenta de gerenciamento para postgresql (PgAdmin4, Postico...).
- rode `yarn` para instalar todas as dependências, caso não temha yarn, pode usar `npm install` para instalá-las.
- cd server && run `yarn knex:migrate` ou `npm run knex:migrate` para rodar as migrations.
- Rode `yarn knex:rollback` caso queira excluir todas as tabelas do banco.
- Após isto no mesmo diretório rode `yarn dev` ou `npm run dev`, para executar o backend da aplicação em modo de desenvolvimento. Com isso sua aplicação estará rodando no seguinte endereço: `http://localhost:3333`. Caso seja necessário testar as rotas do backend pode ser usado um software chamado Imsomnia.

Crie esta trigger:
```SQL
CREATE OR REPLACE FUNCTION add_modifications()
RETURNS TRIGGER AS $$ 
	BEGIN 
	  IF(TG_OP='INSERT') THEN
	    INSERT INTO changelog(description) 
            VALUES('Treinador com id: ' || NEW.id_trainer || ' capturou pokemon com id: '|| NEW.id_pokemon);
            RETURN NEW;
	 END IF;
       END; 
$$ LANGUAGE plpgsql;


CREATE TRIGGER modifications
	AFTER INSERT ON pokemon_trainer
	FOR EACH ROW
	EXECUTE PROCEDURE add_modifications();
```

### Rotas (backend)

|      |Pokemon  |Trainer               |
|------|---------|----------------------|
| GET  |         |/see-your-pokemons/:id|
|POST  |         |/ && /login
|PUT   |         |/forgot-password
|DELETE|         |/delete


### Techs(FrontEnd)
- AXIOS
- react-dropzone
- react-router-dom
- TypeScript
- react-icons

### Como rodar?
- Com este repositório clonado e dentro do diretório do mesmo, vá até cd web.
- Rode `yarn` ou `npm install` para instalar todas as dependências. 
- Rode `yarn start` ou `npm start` para iniciar a aplicação.
- Com isso a aplicação estará rodando no endereço `http://localhost:3000`.
- Tenha certeza que o backend foi iniciado, para que todas as funcionalidades, sejam habilitadas.

