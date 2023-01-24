const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Passando objeto com origin específico para produção
// ou deixando vazio para permitir todos os origin em desenvolvimento
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

// Tratando erro de processamento de requisição
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

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


app.listen(3333, () => {
    console.log('Server running on port 3333')
});

