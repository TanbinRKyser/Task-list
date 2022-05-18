const { MongoClient } = require("mongodb");


// Connection URI
const connectionUri = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

// Create a new MongoClient
const client = new MongoClient( connectionUri );

async function run() {
    // Use connect method to connect to the server
    await client.connect();

    console.log('Connected successfully to server');

    const db = client.db( databaseName );

    const collection = db.collection('users').insertOne({
        'name': 'tusker',
        'age' : 30
    },( error, result) => {
        if( error ){
            return console.log('Unable to insert user');
        }

        console.log( result.acknowledged );
    });

    // the following code examples can be pasted here...
    return 'done.';
}

run().then( console.log )
    .catch( "Unable to insert data" );