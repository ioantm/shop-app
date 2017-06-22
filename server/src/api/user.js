
import { Router } from 'express';
import passport from 'passport';
import User from '../models/User';

export default (app, sessStore) => {
  const router = Router();

  router.get('/login', () => {

  });

  router.post('/login', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blak').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      res.send(
        {
          errors
        },
        400
      );
      return;
    }
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.send({ errors: [info] }, 400);
      }

      return req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  router.post('/signup', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req
      .assert('password', 'Password must be at least 4 characters long')
      .len(4);
    req
      .assert('confirmPassword', 'Passwords do not match')
      .equals(req.body.password);
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
      res.send({ errors }, 400);
      return;
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.send(
          {
            errors: [{ msg: 'Account with that email address already exists.' }]
          },
          400
        );
      }

      return user.save((saveUserErr) => {
        if (saveUserErr) {
          return next(saveUserErr);
        }

        return req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }

          return res.send(user);
        });
      });
    });
  });

  router.get('/logout', (req, res, next) => {
    const sid = req.sessionID;
    req.logOut();
    req.session.destroy((err) => {
      if (err) {
        next(err);
      }
      sessStore.destroy(sid);
      res.send({ message: 'success' });
    });
  });

  return router;
};
