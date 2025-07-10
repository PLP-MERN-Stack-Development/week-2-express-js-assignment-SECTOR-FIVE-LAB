const express = require('express');
const { auth, validateProduct, logger } = require('../middleware/authentication');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// GET /api/products - List all products
router.get('/products', logger, (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
router.get('/products/:id', logger, (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// POST /api/products - Create a new product
router.post('/products', auth, validateProduct, (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put('/products/:id', auth, validateProduct, (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      ...req.body,
    };

    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/products/:id', auth, logger, (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;