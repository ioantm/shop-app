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
import cors from 'cors';
import mongoStore from 'connect-mongo';
import request from 'request';

const MongoStore = mongoStore(session);

const port = process.env.PORT || 8000;
const sessionSecret = process.env.SESSION_SECRET || 's3cretttt';
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
app.use(bodyParser.json());
app.use(expressValidator());
passportConfig();
const sesStore = new MongoStore({
  url: mongodbUri,
  autoReconnect: true,
});

app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
  secret: sessionSecret,
  store: sesStore,
}));


app.use(passport.initialize());
app.use(passport.session());  

app.use('/api', api(app, sesStore));
app.use(errorHandler());
app.use(express.static('public'));

app.listen(port, () => {
    console.log('started on port ', port);
});
