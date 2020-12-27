const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/kafeen';
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error(err);
    console.error('Could not connect to the database, exiting');
    process.exit();
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Drink = require('../models/drink');
const Cafe = require('../cafes/cafe.model');
const Customer = require('../models/customer');
const { Order } = require('../orders/order.model');

const deleteAllData = async () => {
  await Drink.deleteMany().catch(err => console.error(err));
  await Cafe.deleteMany().catch(err => console.error(err));
  await Customer.deleteMany().catch(err => console.error(err));
  await Order.deleteMany().catch(err => console.error(err));
  console.log('All records deleted');
};

let cafe;
const createCafe = async () => {
  cafe = new Cafe({ name: 'Kafeen' });
  await cafe.save();
  console.log('cafe created');
};

const createDrinks = async () => {
  for (const name of ['Americano', 'Latte', 'Flat White']) {
    const drink = new Drink({ name, cafe });
    await drink.save();
  }
  console.log('drinks created');
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

populateData().catch(err => console.error(err));
