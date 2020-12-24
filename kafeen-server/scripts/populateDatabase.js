const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/kafeen';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Drink = require('../models/drink');
const Cafe = require('../models/cafe');
const Customer = require('../models/customer');
const { Order } = require('../models/order');

const deleteAllData = async () => {
  await Drink.deleteMany().catch(err => console.log(err));
  await Cafe.deleteMany().catch(err => console.log(err));
  await Customer.deleteMany().catch(err => console.log(err));
  await Order.deleteMany().catch(err => console.log(err));
  console.log('All records deleted');
};

const drinks = [];
const createDrinks = async () => {
  for (const name of ['Americano', 'Latte', 'Flat White']) {
    const drink = new Drink({ name });
    await drink.save();
    drinks.push(drink);
  }
  console.log('drinks created');
};

const createCafe = async () => {
  const cafe = new Cafe({ name: 'Kafeen', drinks });
  await cafe.save();
  console.log('cafe created');
};

const createCustomer = async () => {
  const customer = new Customer({ name: 'iCustomer' });
  await customer.save();
  console.log('customer created');
};

const populateData = async () => {
  await deleteAllData();
  await createDrinks();
  await createCafe();
  await createCustomer();
  console.log('closing connection');
  await db.close();
};

populateData().catch(err => console.log(err));
