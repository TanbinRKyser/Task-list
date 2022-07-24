const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/users', async ( request, response ) => {

    const user = new User(request.body);

    // user.save()
    //     .then( () => {
    //         response.send( user ) })
    //     .catch( ( error ) => {
    //         response.status( 400 ).send( error );
    //     });

        try{
            const token = await user.generateAuthToken();
            await user.save();
            response.status( 201 ).send( user );
        } catch( error ){
            response.status( 400 ).send( error );
        }
});

router.post('/users/login', async ( request, response ) => {
    try{
        const user = await User.findByCredentials( request.body.email, request.body.password );

        const token = await user.generateAuthToken();

        // response.send( user );
        response.send( { user, token } );
    } catch( error ){
        response.status( 400 ).send( error );
    }
});

router.get('/users', async ( request, response ) => {

    try{
        const users = await User.find({});
        response.send( users );
    } catch( error ){
        response.status( 500 ).send( error );
    }

});

router.get('/users/:id', async ( request, response ) => {
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
});

router.patch('/users/:id', async ( request, response ) => {

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

        const user = await User.findById( _id );
        
        updates.forEach( update => user[ update ] = body[ update ] )

        await user.save();

        // const user = await User.findByIdAndUpdate( _id, body, { new: true, runValidators: true } );

        if( !user ){
            return response.status( 404 ).send( "User not found" );
        }

        response.send( user );
    } catch( error ){
        response.status( 400 ).send( error );
    }

}); 

router.delete('/users/:id', async( request, response ) => {
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


module.exports = router;