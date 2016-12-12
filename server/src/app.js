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
import mongoStore from 'connect-mongo';

const MongoStore = mongoStore(session);

const port = process.env.PORT || 8000;
const sessionSecret = process.env.SESSION_SECRET || 's3cret';
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppingList';
const app = express();

<<<<<<< HEAD
// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// middleware configuration
=======
//middleware configuration
>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
app.use(bodyParser.json());
app.use(expressValidator());
passportConfig();
app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: { 
    maxAge : (4 * 60 * 60 * 1000),
    domain: ".app.localhost", 
  },
  secret: sessionSecret,
  store: new MongoStore({
    url: mongodbUri,
    autoReconnect: true
  })
}));


app.use(passport.initialize());
app.use(passport.session());
<<<<<<< HEAD

// Enable cors
app.use(cors());

app.use((req, res, next) =>{
  console.log('hmm', req.isAuthenticated());
  next();
})

=======
>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
app.use('/api', api());
app.use(errorHandler());
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.listen(port, () => {
    console.log('started on port ', port);
});
