// @flow

import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import errorHandler from 'errorhandler';
import mongoStore from 'connect-mongo';
import cors from 'cors';
/* eslint-disable no-unused-vars */
import passportConfig from './config/passport';
/* eslint-disable no-unused-vars */
import api from './api';


const MongoStore = mongoStore(session);

const port = process.env.PORT || 8000;
const sessionSecret = process.env.SESSION_SECRET || '1234567890QWERTY';
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppingList';
const app = express();

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
  store: new MongoStore({
    url: mongodbUri,
    autoReconnect: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('zzz', req.user);
  res.locals.user = req.user;
  next();
});

app.use('/api', api());
app.use(errorHandler());
app.use(express.static('public'));

app.listen(port, () => {
    console.log('started on port ', port);
});
