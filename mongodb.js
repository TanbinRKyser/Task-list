const { MongoClient, ObjectId } = require("mongodb");


// Connection URI
const connectionUri = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log( id );
// console.log( id.id.length );
// console.log( id.getTimestamp() );
// console.log( id.toHexString().length );

// Create a new MongoClient
const client = new MongoClient( connectionUri );

async function run() {
    // Use connect method to connect to the server
    await client.connect();

    const db = client.db( databaseName );

    /* db.collection('users').insertOne({
        '_id': id,
        'name': 'tusker',
        'age': 30
    }, ( error, result ) => {
        if( error ){
            console.log( "Unable to insert data" );
        }

        console.log(`${result.insertedId} was inserted`);
    }) */
}

run();