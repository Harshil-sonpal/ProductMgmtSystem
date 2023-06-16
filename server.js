const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const PORT = 8080;
  
app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});