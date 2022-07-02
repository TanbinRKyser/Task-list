const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api');

    /* const taskSchema = new mongoose.Schema({
        description: {
            type: String,
            trim: true,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }); */

}

main().catch( err => console.log( err ) );