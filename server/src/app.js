// @flow

import express from 'express'
import api from './api'
import mongoose from 'mongoose'
import expressValidator from 'express-validator'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import passport from 'passport'
import session from 'express-session'
import passportConfig from './config/passport'
import errorHandler from 'errorhandler'
import { add } from 'ramda';

const port = process.env.PORT || 8000;
const sessionSecret = process.env.SESSION_SECRET || '1234567890QWERTY';
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppingList';
const app = express();

//middleware configuration
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: sessionSecret,
//   store: new MongoStore({
//     url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
//     autoReconnect: true
//   })
}));

app.use(passport.initialize());
app.use('/api', api());
app.use(errorHandler());
//app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.listen(port, () => {
    console.log('started on port ', port);
});
