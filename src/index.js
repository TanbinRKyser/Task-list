const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use( express.json() );


// Creating endpoints
// --------------------------------------


/* app.post('/users', async ( request, response ) => {

    const user = new User(request.body);

    // user.save()
    //     .then( () => {
    //         response.send( user ) })
    //     .catch( ( error ) => {
    //         response.status( 400 ).send( error );
    //     });

        try{
            await user.save();
            response.status( 201 ).send( user );
        } catch( error ){
            response.status( 400 ).send( error );
        }
});
 */

/* app.get('/users', async ( request, response ) => {

    try{
        const users = await User.find({});
        response.send( users );
    } catch( error ){
        response.status( 500 ).send( error );
    }

});

app.get('/users/:id', async ( request, response ) => {
    // console.log( request.params.id );
    const _id = request.params.id;

    try{
        const user = await User.findById( _id );
        if( !user ){
            return response.status(404).send("User not found")
        }
        response.send( user );
    } catch( error ){
        response.status( 500 ).send( error );
    }
}); */

/* app.patch('/users/:id', async ( request, response ) => {

    const updates = Object.keys( request.body );
    const allowedProperties = [ 'name', 'email', 'password', 'age' ];
    const validOperations = updates.every( ( update ) => {
        return allowedProperties.includes( update )    
    });

    if( !validOperations ){
        response.status( 400 ).send( { error: 'Invalid update property' } );
    }

    const _id = request.params.id;
    const body = request.body;

    try{
        const user = await User.findByIdAndUpdate( _id, body, { new: true, runValidators: true } );

        if( !user ){
            return response.status( 404 ).send( "User not found" );
        }

        response.send( user );
    } catch( error ){
        response.status( 400 ).send( error );
    }

}); */

app.delete('/users/:id', async( request, response ) => {
    const _id = request.params.id;

    try{
        const user = await User.findByIdAndDelete( _id );

        if( !user ){
            return response.status(404).send("User not found")
        }
        
        response.send( user ); 
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

// create a task model, endpoint and test
// POST

app.post('/tasks', async ( request, response )=>{

    const task = new Task( request.body );

    try{
        await task.save();
        response.status(201).send( task );
    } catch( error ){
        response.status(400).send( error );
    }

});

// GET

app.get('/tasks', async ( request, response ) => {

    try{
        const tasks = await Task.find( {} );
        response.send( tasks );
    } catch( error ){
        response.status( 500 ).send( error );
    }
}); 

// GET id
app.get('/tasks/:id', async ( request, response ) => {

    const _id = request.params.id;

    try{
        const task = await Task.findById( _id );
        if( !task ){
            return response.status(404).send("User not found");
        }
        response.send( task );
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

app.patch('/tasks/:id', async ( request, response ) => {

    const updates = Object.keys( request.body );
    const allowedProperties = [ 'description', 'completed' ];
    const validOperations = updates.every( update => allowedProperties.includes( update ) );

    if( !validOperations ){
        response.status( 400 ).send( { error: 'Invalid update: Property doesn\'t exist' } );
    }

    try{
        const task = await Task.findByIdAndUpdate( request.params.id, 
                                                    request.body, 
                                                    { new: true, runValidators: true } );

        if( !task ){
            return response.status( 404 ).send( "Task not found" );
        }

        response.send( task );
    } catch( error ){
        response.status( 400 ).send( error );
    }

});

app.delete('/tasks/:id', async( request, response ) => {

    try{
        const task = await Task.findByIdAndDelete( request.params.id );

        if( !task ){
            return response.status(404).send("Task not found")
        }
        
        response.send( task ); 
    } catch( error ){
        response.status( 500 ).send( error );
    }
});


app.listen( port, () => {
    console.log("Server is up on port.");
}) 