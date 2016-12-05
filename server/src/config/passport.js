import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

passport.serializeUser((user, done) => {
  console.log('serializeUser', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('try deserializeUser');
  User.findById(id, (err, user) => {
    console.log('deserializeUser', user);
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('local strategy');
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      console.log('find user', err);
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          msg: `Email ${email} not found`,
        });
      }
      console.log('compare pass');
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          console.log('is match');
          return done(null, user);
        }

        return done(null, false, { msg: `Invalid email or password`});
      });
    });
  }));
