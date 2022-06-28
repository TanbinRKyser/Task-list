const { MongoClient, ObjectId } = require("mongodb");


// Connection URI
const connectionUri = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log( id );

// Create a new MongoClient
const client = new MongoClient( connectionUri );

async function run() {
    // Use connect method to connect to the server
    await client.connect();

    const db = client.db( databaseName );

    db.collection('tasks').deleteOne(
        { _id: new ObjectId('62b9a9f36df7a5492c8bd28a') }
    ).then( ( result ) => {                            
        console.log( result );
    }).catch( ( error ) => {
        console.log( error );
    });

    /* db.collection('users').deleteOne(
        { name: 'Tusker' }
    ).then( ( result ) => {                            
        console.log( result );
    }).catch( ( error ) => {
        console.log( error );
    }); */
}

run();