import express from 'express';
import ProductManager from './productManager.js';
const container = new ProductManager('./src/products.json');

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await container.getProducts();
    if (limit) {
      return res.json(products.slice(0, limit));
    } else {
      return res.json(products);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await container.getProductById(parseInt(id));

    if (product) {
      return res.json(product);
    }
  } catch (error) {
    console.log(error);
  }
});
