//@flow

import { Router } from 'express';
import passport from 'passport';
import util from 'util';
import User from '../models/User';



export default () => {
    const router = Router();
<<<<<<< HEAD

    router.get('/login', (req, res, next) => {
        console.log('get');
    });

=======
    
>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
    router.post('/login', (req, res, next) => {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blak').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        const errors = req.validationErrors();
        
        if (errors) {
            res.send({
                errors
            }, 400);
            return;
        }
<<<<<<< HEAD

        if (!user) {  
          return res.send({ errors: [info] }, 400);
        }

        req.logIn(user, (err) => {
          if (err) { return next(err); }
          console.log('hmm', req.user, req.isAuthenticated());
           res.json(user);
        });
      })(req, res, next);
=======
        
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                console.log('no user, handle no user', err, info);
                return res.send({ errors: [info]}, 400);
            }
            
            res.json(user)
        })(req, res, next);
>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
    });

    router.post('/signup', (req, res, next) => {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
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
                return res.send({ errors: [{ msg: 'Account with that email address already exists.' }]}, 400);
            }

            user.save((err) => {
                if (err) {
                    return next(err);
                }
                
                res.send(user);
            });
        })

    })

    return router;
};