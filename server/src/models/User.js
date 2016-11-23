import mongoose from 'mongoose';

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

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    cb(null, candidatePassword === this.password)
}

const User = mongoose.model('User', userSchema);