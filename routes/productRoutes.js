const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const router = express.Router();

// Get all products or by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, price, image, category } = req.body;

  const product = new Product({
    name,
    price,
    image,
    category,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = mongoose.Types.ObjectId(req.params.id); // Convert string ID to ObjectId
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send('Product removed successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;