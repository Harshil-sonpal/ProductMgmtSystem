const express = require('express');
const app = express();
const cors = require("cors")
const sequelize = require('./utils/database');
const productsRoutes = require('./routes/products');

sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productsRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
