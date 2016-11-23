import { Router } from 'express';
import passport from 'passport';

export default () => {
    const router = Router();

    router.post('/login', (req, res, next) => {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blak').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        const errors = req.validationErrors();
        
        if (errors) {
            console.log('errors', errors);
            res.json(errors);
        }
        
        console.log('email', req.body.email);
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log('authenticate err ', err);
                return next(err);
            }

            if (!user) {
                console.log('no user, handle no user', err, info);
            }

            console.log('login success ', user);
           
            res.json(user)
        })(req, res, next);
    });

    return router;
};