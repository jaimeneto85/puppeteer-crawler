const puppeteer = require('puppeteer');
const logger = require('./logger');

async function getMostExpensiveProduct() {
  let browser;
  try {
    logger.info('Iniciando o Puppeteer');

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Configurando timeout da navegação
    await page.setDefaultNavigationTimeout(60000);

    logger.info('Acessando a página de login');
    await page.goto('https://www.saucedemo.com/', {
      waitUntil: 'networkidle2',
    });

    // Identificando usuário e senha automaticamente
    logger.info('Identificando usuário e senha automaticamente');

    // Verificando os usuários disponíveis
    const users = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user',
    ];
    const password = 'secret_sauce';

    // testando o 'standard_user' para o login
    const username = 'standard_user';

    // Preenchendo o formulário de login
    await page.type('#user-name', username);
    await page.type('#password', password);

    logger.info('Realizando login');
    await Promise.all([
      page.click('#login-button'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    // Verificando se o login foi bem-sucedido
    const loginError = await page.$('.error-message-container');
    if (loginError) {
      throw new Error('Falha no login. Verifique as credenciais.');
    }

    logger.info('Login bem-sucedido');

    // Extraindo informações dos produtos
    logger.info('Extraindo informações dos produtos');
    const products = await page.$$eval('.inventory_item', (items) => {
      return items.map((item) => {
        const title = item.querySelector('.inventory_item_name').innerText;
        const priceText = item
          .querySelector('.inventory_item_price')
          .innerText.replace('$', '');
        const price = parseFloat(priceText);
        const description = item.querySelector(
          '.inventory_item_desc',
        ).innerText;
        const image = item.querySelector('.inventory_item_img img').src;
        return { title, price, description, image };
      });
    });

    if (products.length === 0) {
      throw new Error('Nenhum produto encontrado');
    }

    // Encontrando o produto mais caro
    logger.info('Encontrando o produto mais caro');
    const mostExpensiveProduct = products.reduce((prev, current) =>
      prev.price > current.price ? prev : current,
    );

    logger.info('Produto mais caro encontrado: %s', mostExpensiveProduct.title);

    await browser.close();

    return mostExpensiveProduct;
  } catch (error) {
    logger.error('Erro no crawler: %s', error.message);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

module.exports = { getMostExpensiveProduct };
