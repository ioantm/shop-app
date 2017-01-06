import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

export default () => {  
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
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            msg: `Email ${email} not found`,
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }

          if (isMatch) {
            console.log('is match', user);
            return done(null, user);
          }

          return done(null, false, { msg: `Invalid email or password`});
        });
      });
    }));
};

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  console.log('isAuthenticated', req.isAuthenticated(), req.method, req.url, req.path);
  // if (req.method === 'OPTIONS' || req.isAuthenticated()) {
  //   return next();
  // }
  return res.status(401).send({ errors: [{ msg: 'Not authenticated' }] });
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
