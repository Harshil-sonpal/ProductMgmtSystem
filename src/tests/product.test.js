const request = require('supertest');
const app = require('../src/server');
const sequelize = require('../src/utils/database');
const Product = require('../src/models/Product');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await Product.destroy({ where: {} });
  await sequelize.close();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        image: 'sample.jpg',
        price: 9.99
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('id');
    expect(response.body.product).toHaveProperty('name', 'Sample Product');
    expect(response.body.product).toHaveProperty('image', 'sample.jpg');
    expect(response.body.product).toHaveProperty('price', 9.99);
    expect(response.body.product).toHaveProperty('creationAt');
  });
});
