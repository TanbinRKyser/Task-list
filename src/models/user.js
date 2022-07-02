const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 1,
        validate( value ){
            if( value < 0 ){
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate( value ){
            if( !validator.isEmail( value ) ){
                throw new Error('Not a valid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate( value ){
            if( value.toLowerCase().includes('password') ){
                throw new Error('password is not allowed as password');
            }
        }
    }
});

module.exports = User;