const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.options('*', cors());
// router.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

module.exports = app;
