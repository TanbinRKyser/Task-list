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

    /* db.collection('tasks').findOne({ _id: new ObjectId('62866bc2f490799ed9229479')}, ( error, task ) =>{
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
    }); */

    /* db.collection('users').updateOne({
        _id: new ObjectId('628681fa7ee8e98b51067706')
    },{ 
        $set:{
            name: 'Chloe'            
        },
        $inc:{
            age: 1
        }
    }).then( ( result ) => {                            // Promise instead of callback
        console.log( result );
    }).catch( ( error ) => {
        console.log( error );
    }); */

    db.collection('tasks').updateMany(
        { completed: false },
        {
            $set:{
                completed: true
            }
        }
    ).then( ( result ) => {                            
        console.log( result );
    }).catch( ( error ) => {
        console.log( error );
    });
}

run();