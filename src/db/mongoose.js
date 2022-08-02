const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api');
}

main().catch( err => console.log( err ) );