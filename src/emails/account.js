const sgMail = require('@sendgrid/mail');


const sendGridApiKey = 'SGApiKey';

sgMail.setApiKey( sendGridApiKey );

const msg = {
    to: '<<sender>>@gmail.com',
    from: '<<receiver>>@gmail.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

//ES6
sgMail
.send(msg)
.then(() => {}, error => {
    console.error(error);

    if (error.response) {
    console.error(error.response.body)
    }
});