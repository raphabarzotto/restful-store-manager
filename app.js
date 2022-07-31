const express = require('express');
const bodyParser = require('body-parser');

const { productsRouters } = require('./routers');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouters);

app.use(middlewares.handleError);
app.all('*', middlewares.handleRouteNotFound);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;