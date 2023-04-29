const fs = require('fs');

class ProductManager {
  id = 1;
  constructor(path) {
    this.path = path;
  }

  async addProduct(productData) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }

    const { title, description, price, thumbnail, code, stock } = productData;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return 'complete all fields';
    } else {
      let products = [];

      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);

      const productFound = products.some((item) => item.code == code);
      if (productFound) {
        return 'The product already exists';
      } else {
        if (products.length > 0) {
          this.id = products[products.length - 1].id + 1;
        }
        const product = { id: this.id, ...productData };
        products.push(product);
        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Added product!';
      }
    }
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let products = [];

    let productsContent = await fs.promises.readFile(this.path, 'utf-8');
    products = JSON.parse(productsContent);
    return products;
  }

  async getProductById(id) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let products = [];
    let productsContent = await fs.promises.readFile(this.path, 'utf-8');
    products = JSON.parse(productsContent);

    const productFound = products.find((item) => item.id == id);
    if (productFound) {
      console.log('The found product is ');
      return productFound;
    } else {
      return 'Not found';
    }
  }

  async updateProduct(id, modifyProduct) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let products = [];
    let productsContent = await fs.promises.readFile(this.path, 'utf-8');
    products = JSON.parse(productsContent);

    const { title, description, price, thumbnail, stock } = modifyProduct;
    let indexProduct = products.findIndex((index) => index.id === id);
    if (indexProduct !== -1) {
      products[indexProduct].title = title || products[indexProduct].title;
      products[indexProduct].description = description || products[indexProduct].description;
      products[indexProduct].price = price || products[indexProduct].price;
      products[indexProduct].thumbnail = thumbnail || products[indexProduct].thumbnail;
      products[indexProduct].stock = stock || products[indexProduct].stock;

      let productString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return 'Modified Product';
    } else {
      return 'Product Not Found';
    }
  }

  async deleteProduct(id) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let products = [];
    let productsContent = await fs.promises.readFile(this.path, 'utf-8');
    products = JSON.parse(productsContent);

    let indexProduct = products.findIndex((index) => index.id === id);
    if (indexProduct !== -1) {
      products.splice(indexProduct, 1);
      let productString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return 'Delete product!';
    } else {
      return 'Product Not Found';
    }
  }
}

const product1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 10,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 7,
};

const product2 = {
  title: 'producto prueba 2',
  description: 'Este es un producto prueba 2',
  price: 10,
  thumbnail: 'Sin imagen',
  code: 'abc124',
  stock: 15,
};

const product3 = {
  title: 'producto prueba 3',
  description: 'Este es un producto prueba 3',
  price: 5,
  thumbnail: 'Sin imagen',
  code: 'abc125',
  stock: 2,
};

const modifyProduct = {
  title: 'En este caso unicamente cambio el titulo',
};

const productManager = new ProductManager('products.json');

productManager
  .updateProduct(9, modifyProduct)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
/* productManager
  .deleteProduct(2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  }); */

/* productManager
  .addProduct(product2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  }); */

/* productManager
  .getProducts()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
 */
/* productManager
  .getProductById(0)
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); */

export default ProductManager();
