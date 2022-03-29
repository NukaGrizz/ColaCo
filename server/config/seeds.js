const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Sodas' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Fizz',
      description:
        'An effervescent fruity experience with hints of grape and coriander.',
      category: categories[0]._id,
      price: 1.00,
      maximumQuantity: 100,
      quantity: 100
    },
    {
      name: 'Pop',
      description:
        'An explosion of flavor that will knock your socks off!',
      category: categories[0]._id,
      price: 1.00,
      maximumQuantity: 100,
      quantity: 100
    },
    {
      name: 'Cola',
      description:
        'An explosion of flavor that will knock your socks off!',
      category: categories[0]._id,
      price: 1.00,
      maximumQuantity: 200,
      quantity: 100
    },
    {
      name: 'Mega Pop',
      description:
        'An explosion of flavor that will knock your socks off!',
      category: categories[0]._id,
      price: 1.00,
      maximumQuantity: 50,
      quantity: 50
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Nuka',
    lastName: 'Grizz',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  console.log('users seeded');

  process.exit();
});
