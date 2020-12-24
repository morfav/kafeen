const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
const drinksRouter = require('./routes/drinks');
const cafesRouter = require('./routes/cafe.routes');

const app = express();

const mongoDB = 'mongodb://127.0.0.1/kafeen';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', ordersRouter);
app.use('/cafes', cafesRouter);
app.use('/customers', customersRouter);
app.use('/drinks', drinksRouter);

module.exports = app;
