import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true
    },

    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    profile: {
        name: String
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    console.log('user', user);
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }

            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    })
}

const User = mongoose.model('User', userSchema);

export default User;