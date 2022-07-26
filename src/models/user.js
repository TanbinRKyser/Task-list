const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// user schema
userSchema.statics.findByCredentials = async ( email, password ) => {
    
    const user = await User.findOne({ email: email });
    
    if( !user ){
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare( password, user.password );
    
    if( !isMatch ){
        throw new Error('Unable to log in');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'S3cr3t_k3Y)' );

    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Hash plain text password
userSchema.pre('save', async function( next ){
    const user = this;
    
    if( user.isModified('password') ){
        user.password = await bcrypt.hash( user.password, 8 )
    }

    next();
});

const User = mongoose.model('User', userSchema );

module.exports = User;