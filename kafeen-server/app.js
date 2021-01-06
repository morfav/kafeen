const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./logger/winston')(__filename);
const { stream } = require('./logger/stream');
const launchBarista = require('./orders/BaristaSimulator');

const ordersRouter = require('./orders/order.routes');
const customersRouter = require('./routes/customers');
const drinksRouter = require('./routes/drinks');
const cafesRouter = require('./cafes/cafes.routes');

const app = express();

const mongoDB = 'mongodb://127.0.0.1/kafeen';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    logger.error(err);
    logger.error('Could not connect to the database, exiting');
    process.exit();
  });
mongoose.connection.on('error', err => logger.error('MongoDB connection error: ' + err));

app.use(cors());
app.options('*', cors());
app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', ordersRouter);
app.use('/cafes', cafesRouter);
app.use('/customers', customersRouter);
app.use('/drinks', drinksRouter);
app.use((req, res, next) => {
  logger.error(req.path);
  res.status(404).send({
    status: 404,
    error: 'Not found',
  });
});

if (process.env.NODE_ENV !== 'production') {
  launchBarista();
}

module.exports = app;
