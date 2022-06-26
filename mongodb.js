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

    /* db.collection('users').findOne({name: 'tusker'},( error, user ) => {
        if( error ){
            return console.log('unable to find user');
        }

        console.log( user );
    }); */

    /* db.collection('users').find({ _id: new ObjectId('628681fa7ee8e98b51067706') }).toArray( (error, result ) =>{
        console.log( result );
    });
    
    db.collection('users').find({ _id: new ObjectId('628681fa7ee8e98b51067706') }).count( (error, result ) =>{
        console.log( result );
    }); */

    db.collection('tasks').findOne({ _id: new ObjectId('62866bc2f490799ed9229479')}, ( error, task ) =>{
        if( error ){
            return console.log('unable to find user');
        }

        console.log( task );
    });

    db.collection('tasks').find({ completed: false }).toArray( (error, task ) => {
        if( error ){
            console.log("unable to fetch data");
        }

        console.log( task );
    });
}

run();