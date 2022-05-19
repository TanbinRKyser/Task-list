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

    /*  db.collection('users').insertOne(
        { name: "tusker", age: 30 }, (error,result)=>{
            if( error ){
                console.log("Unable to insert data");
            }
            console.log(`${result.insertedId} document was inserted`)
        }); */

    /* const userList = [
        { name: "tusker", age: 30 },
        { name: "chloe", age: 26 },
        { name: "theo", age: 24 }
    ];

    const options = { ordered: true };
    db.collection('users').insertMany(
        userList,
        options, 
        ( error, result ) => {
            if( error ){
                return console.log('Unable to insert user');
            }

            console.log(`${result.insertedCount} documents were inserted`);
    });   */ 

    // assignment
    // insertmany to insert the documents
    // setup the callbacks
    // run the script
    // refresh the database
    const taskList = [
        { description: "Learn Javascript", completed: true },
        { description: "Learn react.js", completed: false },
    ];

    db.collection('tasks').insertMany(
        taskList,
        ( error, result ) => {
            if( error ){
                return console.log('Unable to insert user');
            }

            console.log(`${result.insertedCount} documents were inserted`);
    });
}

run().catch( "Unable to insert data" );