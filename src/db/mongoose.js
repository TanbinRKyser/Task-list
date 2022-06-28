const mongoose = require('mongoose');

main().catch( err => console.log( err ) );

async function main() {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api');

    const userSchema = new mongoose.Schema({
        name: {
            type: String
        },
        age: {
            type: Number
        }
    });
    
    const User = mongoose.model('User', userSchema );
    
    const Tusker = new User({
        name: 'Tusker',
        age: 30
    })
    
    
    Tusker.save()
        .then( () =>{
            console.log( Tusker );
        }).catch( ( error ) => {
            console.log(error);
        });
}