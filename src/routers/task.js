const express = require('express');
const router = express.Router();
const Task = require('../models/task');


router.post('/tasks', async ( request, response )=>{

    const task = new Task( request.body );

    try{
        await task.save();
        response.status(201).send( task );
    } catch( error ){
        response.status(400).send( error );
    }

});

// GET all tasks

router.get('/tasks', async ( request, response ) => {

    try{
        const tasks = await Task.find( {} );
        response.send( tasks );
    } catch( error ){
        response.status( 500 ).send( error );
    }
}); 

// GET task
router.get('/tasks/:id', async ( request, response ) => {

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

router.patch('/tasks/:id', async ( request, response ) => {

    const updates = Object.keys( request.body );
    const allowedProperties = [ 'description', 'completed' ];
    const validOperations = updates.every( update => allowedProperties.includes( update ) );

    if( !validOperations ){
        response.status( 400 ).send( { error: 'Invalid update: Property doesn\'t exist' } );
    }

    try{
        const task = await Task.findById( request.params.id );
        
        updates.forEach( update => task[ update ] = request.body[ update ] )

        await task.save();

        if( !task ){
            return response.status( 404 ).send( "Task not found" );
        }

        response.send( task );
    } catch( error ){
        response.status( 400 ).send( error );
    }

});

router.delete('/tasks/:id', async( request, response ) => {

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

module.exports = router;