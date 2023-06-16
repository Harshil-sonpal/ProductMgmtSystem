const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const { Sequelize } = require('sequelize');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file.path;
    // console.log("image:-", image);

    const product = await Product.create({ name, image, price });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    await product.save();

    res.json(product);
  } catch (error) {
    //console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const { page, limit } = req.query;
      const offset = (page - 1) * limit;
  
      const products = await Product.findAll({
        offset,
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']],
      });

      res.json(products);
    } catch (error) {
        //console.error('Error retrieving product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;

    const products = await Product.findAll({
      where: {
        name: { [Sequelize.Op.like]: `%${name}%` },
      },
    });
    res.json(products);
  } catch (error) {
    //console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const products = await Product.findAll({
      where: {
        createdAt: { [Sequelize.Op.between]: [startDate, endDate] },
      },
    });

    res.json(products);
  } catch (error) {
    //console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
