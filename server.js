const express = require('express');
const swaggerUi = require('swagger-ui-express'); //para o swegger
const swaggerDocument = require('./swagger.json'); //para o swegger
const pool = require('./config/database'); //para o DB
const referenceRoutes = require('./src/routes/referenceRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const statisticsRoutes = require('./src/routes/statisticsRoutes');


// Declarando variaveis 
const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());
app.use(express.text());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/reference', referenceRoutes) //rota que retorna as listas para seleção (peixes, classificação TE)
app.use('/search', searchRoutes) // rota para retornar os dados de um peixe expecífico
app.use('/statistics', statisticsRoutes) //rota para retornar dados e montar o grafico

// Conectando ao banco de dados e iniciando o servidor
pool.connect()
  .then(() => {
    console.log('Conectado ao PostgreSQL');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  });

