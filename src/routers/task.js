const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

// TASK model
// CREATE task
router.post('/tasks', auth, async ( request, response )=>{

    const task = new Task( {
        ...request.body,
        author: request.user._id
    } );

    try{
        await task.save();
        response.status( 201 ).send( task );
    } catch( error ){
        response.status( 400 ).send( error );
    }

});

// READ ALL task
// GET /tasks?completed=false
// GET /tasks?limit=5&skip=5 ( skip first 5 )
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async ( request, response ) => {

    const match = {};
    const sort = {};

    if( request.query.completed ){
        // set the completed to boolean from string;
        match.completed = request.query.completed === 'true';
    }

    if( request.query.sortBy ){
        const parts = request.query.sortBy.split(':');
        sort[ parts[0] ] = parts[1] === 'desc' ? -1 : 1;
    }
    try{
        // const tasks = await Task.find( {author: request.user._id} );
        await request.user.populate({
            path: 'tasks',
            // match: { completed: true }
            match,
            options: {
                limit: parseInt( request.query.limit), 
                skip: parseInt( request.query.skip ),
                sort
                // sort: {
                //      createdAt: -1
                //      completed: -1
                // }
            }
        });

        // response.send( tasks );
        response.send( request.user.tasks );
    } catch( error ){
        response.status( 500 ).send( error );
    }
}); 

// READ task
router.get('/tasks/:id', auth, async ( request, response ) => {

    const _id = request.params.id;

    try{
        const task = await Task.findOne( { _id, author: request.user._id } );
        
        if( !task ){
            return response.status(404).send("Task not found");
        }
        response.send( task );
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

// UPDATE task
router.patch('/tasks/:id', auth, async ( request, response ) => {

    const updates = Object.keys( request.body );
    const allowedProperties = [ 'description', 'completed' ];
    const validOperations = updates.every( update => allowedProperties.includes( update ) );

    if( !validOperations ){
        response.status( 400 ).send( { error: 'Invalid update: Property doesn\'t exist' } );
    }

    try{
        const task = await Task.findOne( { _id: request.params.id, author: request.user._id })

        if( !task ){
            return response.status( 404 ).send( "Task not found" );
        }

        updates.forEach( update => task[ update ] = request.body[ update ] )
        await task.save();

        response.send( task );
    } catch( error ){
        response.status( 400 ).send( error );
    }

});

// DELETE task
router.delete('/tasks/:id', auth, async( request, response ) => {

    try{
        // const task = await Task.findByIdAndDelete( request.params.id );
        const task = await Task.findOneAndDelete({ _id: request.params.id, author: request.user._id });

        if( !task ){
            return response.status(404).send("Task not found")
        }
        
        response.send( task ); 
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

module.exports = router;