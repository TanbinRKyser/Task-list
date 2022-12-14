const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');

const auth = require('../middleware/auth');
const User = require('../models/user');

// Creating user profile
router.post('/users', async ( request, response ) => {

    const user = new User(request.body);

    try{
        await user.save();
        
        sendWelcomeEmail( user.email, user.name );

        const token = await user.generateAuthToken();

        response.status( 201 ).send( { user, token } );
        
    } catch( error ){
        response.status( 400 ).send( error );
    }
});

// Logging in
router.post('/users/login', async ( request, response ) => {
    try{
        const user = await User.findByCredentials( request.body.email, request.body.password );

        const token = await user.generateAuthToken();
        
        response.send( { user, token } );
    } catch( error ){
        response.status( 400 ).send( error );
    }
});

// Logging out user
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

// Logging out user from all sessions.
router.post('/users/logoutAll', auth, async ( request, response ) => {
    try{
        request.user.tokens = [];

        await request.user.save();

        response.status( 200 ).send('Logged out of all sessions successfully');
    } catch( error ){
        response.status( 500 ).send( error );
    }
});

// Read profile
router.get('/user/me', auth, async ( request, response ) => {
    response.send( request.user );
});

// Update user Profile
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

        sendCancellationEmail( request.user.email, request.user.name );

        response.send( request.user ); 
    } catch( error ){
        response.status( 500 ).send( error );
    }
});


// File uploading using npm package multer
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter( request, file, fileFilterCallback ){
        if( !file.originalname.match(/\.(jpg|jpeg|png)$/)  ){
            return fileFilterCallback( new Error('File must be a picture( jpg, jpeg, png )') );
        }

        fileFilterCallback( undefined, true )
    }
});

// uploading the file
router.post('/users/me/avatar', auth, upload.single('avatar'), async ( request, response ) => {
    // console.log( request.file.buffer );
    // request.user.avatar = request.file.buffer;

    const buffer = await sharp( request.file.buffer )
                            .resize({
                                width: 250,
                                height: 250
                            }).png()
                            .toBuffer();

    request.user.avatar = buffer;                           
    await request.user.save();

    response.status(200).send('Avatar uploaded successfully');
}, ( error, request, response, next ) => {
    response.status(400).send({ error: error.message });
});

// removing the avatar
router.delete('/users/me/avatar', auth, async ( request, response ) => {
    request.user.avatar = undefined;
    await request.user.save();

    response.status(200).send('Avatar removed successfully');
}, ( error, request, response, next ) => {
    response.status(400).send({ error: error.message });
});


router.get('/users/:id/avatar', async (request,response) => {
    try{
        // console.log( request.params.id );
        const user = await User.findById( request.params.id );
        
        if( !user || !user.avatar ){
            throw new Error();
        }

        response.set('Content-Type', 'image/png');
        response.send( user.avatar );

    } catch( error ){
        response.status( 404 ).send('Avatar doesn\'t exist ');
    }
})

module.exports = router;