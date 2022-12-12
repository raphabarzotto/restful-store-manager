const express = require('express');
const bodyParser = require('body-parser');

const { productsRoutes, salesRoutes } = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.all('*', middlewares.handleRouteNotFound);
app.use(middlewares.handleError);
module.exports = app;