const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
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
            await user.save();
            const token = await user.generateAuthToken();
            response.status( 201 ).send( { user, token } );
        } catch( error ){
            response.status( 400 ).send( error );
        }
});

router.post('/users/login', async ( request, response ) => {
    try{
        const user = await User.findByCredentials( request.body.email, request.body.password );

        const token = await user.generateAuthToken();
        
        response.send( { user, token } );
    } catch( error ){
        response.status( 400 ).send( error );
    }
});

router.post('/users/logout', auth, async ( request, response ) => {
    try{
        request.user.tokens = request.user.tokens.filter( ( token ) => {
            return token.token !== request.token;
        })

        await request.user.save();

        response.status( 200 ).send('Logged out successfully');
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

router.post('/users/logoutAll', auth, async ( request, response ) => {
    try{
        request.user.tokens = [];

        await request.user.save();

        response.status( 200 ).send('Logged out of all sessions successfully');
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

router.get('/user/me', auth, async ( request, response ) => {
    response.send( request.user );
});

router.patch('/users/me', auth, async ( request, response ) => {

    const updates = Object.keys( request.body );
    
    const allowedProperties = [ 'name', 'email', 'password', 'age' ];
    
    const validOperations = updates.every( ( update ) => {
        return allowedProperties.includes( update )    
    });

    if( !validOperations ){
        response.status( 400 ).send( { error: 'Invalid update property' } );
    }

    try{
        updates.forEach( update => request.user[ update ] = request.body[ update ] );

        await request.user.save();

        response.send( request.user );
    } catch( error ){
        response.status( 400 ).send( error );
    }

}); 

router.delete('/users/me', auth, async ( request, response ) => {
    try{
        await request.user.remove();
        response.send( request.user ); 
    } catch( error ){
        response.status( 500 ).send( error );
    }
});


module.exports = router;