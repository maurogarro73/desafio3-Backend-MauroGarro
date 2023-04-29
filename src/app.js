import express from 'express';
import productManager from './productManager';

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
