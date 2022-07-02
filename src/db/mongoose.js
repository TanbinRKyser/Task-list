const mongoose = require('mongoose');
const validator = require('validator');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api');

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
    
    /* const User = mongoose.model('User', userSchema );
    
    const Pierre = new User({
        name: ' Pierre',
        age: 26,
        email: 'Pierre1232@gmail.com',
        password: ' Pierre123'
    }) 
    
    
    Pierre.save()
        .then( () =>{
            console.log( Pierre );
        }).catch( ( error ) => {
            console.log(error);
        }); */

    const taskSchema = new mongoose.Schema({
        description: {
            type: String,
            trim: true,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
        });
        
    const Task = mongoose.model('Task', taskSchema );

    const learnVue = new Task({
        description: " It's time to learn vue.js, right ?          ",
    });

    learnVue.save().then( ()=>{
        console.log( learnVue );
    }).catch( ( error ) => {
        console.log( error );
    });

}

main().catch( err => console.log( err ) );