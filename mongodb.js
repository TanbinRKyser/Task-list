const { MongoClient } = require("mongodb");


// Connection URI
const connectionUri ="mongodb://127.0.0.1:27017";
const databaseName = 'task-manager';

// Create a new MongoClient
const client = new MongoClient( connectionUri );

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    
    console.log('Connected successfully to server');
    
    const db = client.db( databaseName );
    const collection = db.collection('users').insertOne({
        "name":"tusker",
        "age":30
    });

    // the following code examples can be pasted here...
    return 'done.';
}

main()
    .then( console.log )
    .catch( console.error )
    .finally( () => client.close() );