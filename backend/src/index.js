const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // usar ./ para indicar que é a mesma pasta do arquivo index e nao um pacote

const app = express();

// quando for para produção, podemos passar um objeto dentro do construtor de cors indicando o oring
// {origin: 'http://meusite.com'} - irá indicar que somente esse frontend poderá acessar
// deixando vazio, indicamos que todos os frontends poderão usar
app.use(cors());
app.use(express.json()); // Setando o uso do JSON como padrão para comunicação entre as rotas
app.use(routes);


/**
 * Tipos de parâmetros:
 * 
 * Query params: Parametros enviados na rota após "?" (Filtros, paginação)
 * Route params: Parametros utilizados para identificar recursos
 * Request BOdy: Corpo da requisição utilizado para criar ou alterar recursos
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, SQL Server
  * NoSQL: MongoDB, CouchDB, etc
  */

  /**
   * Driver: SELECT * FROM users;
   * Query Builder: table('users').select('*').where()  // knex.js será o utilizado
   */

app.listen(3333);

