const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file.path;
    const creationDate = new Date();
  
    const product = await Product.create({
      name,
      image,
      price,
      creationDate
    });
  
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.uploadImage = async (req, res) => {
//   try {
//     // Handle image upload logic using multer or any other file upload library
    
//     // Get the uploaded image path
//     const imagePath = req.file.path;
    
//     // Process the image path as needed
    
//     // Return the processed image path in the response
//     res.status(200).json({ imagePath });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("productId:-", productId);
    const { name, price } = req.body;
    const image = req.file.path;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.image = image;
    product.price = price;
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'creationDate', sortOrder = 'asc' } = req.query;
    const offset = (page - 1) * limit;

    const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';
    const order = [[sortBy, sortDirection]];

    const { count, rows: products } = await Product.findAndCountAll({
      offset,
      limit,
      order
    });

    res.status(200).json({ totalProducts: count, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("query:-", query);

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      }
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterProductsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const products = await Product.findAll({
      where: {
        creationDate: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
