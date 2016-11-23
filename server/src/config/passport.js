import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    console.log('local strategy');
    User.findOne({ email: email.toLowerCase() }, (err, user) => {

        if (err) { 
            return done(err); 
        }

        if (!user) {
            return done(null, false, {
                msg: `Email ${email} not found`
            })
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }

            if (isMatch) {
                return done(null, user);
            }

            return done(null, false, { msg: `Invalid email or password`});
        })

    })
}));