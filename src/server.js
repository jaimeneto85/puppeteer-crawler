const express = require('express');
const { getMostExpensiveProduct } = require('./crawler');
const logger = require('./logger');

const app = express();
const port = 3000;

app.get('/most-expensive-product', async (req, res) => {
  try {
    logger.info('Requisição recebida em /most-expensive-product');
    const product = await getMostExpensiveProduct();
    res.json(product);
  } catch (error) {
    logger.error('Erro ao obter o produto mais caro: %s', error.message);
    res.status(500).json({ error: 'Erro ao obter o produto mais caro' });
  }
});

app.listen(port, () => {
  logger.info(`Servidor rodando em http://localhost:${port}`);
});
