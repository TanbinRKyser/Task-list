const sgMail = require('@sendgrid/mail');

sgMail.setApiKey( process.env.SENDGRID_API_KEY );

const sendWelcomeEmail = ( email, name ) => {
    sgMail.send({
        to: email,
        from: '<<sender>>@gmail.com',
        subject: 'Welcome to Tasker',
        text: `Welcome to Tasker, ${ name }. Thanks for joining us and we look forward to help your progress soon.`
    })
}

const sendCancellationEmail = ( email, name ) => {
    sgMail.send({
        to: email,
        from: '<<sender>>@gmail.com',
        subject: 'Cancellation from Tasker',
        text: `Sorry to see you go ${ name }. Hope to see you soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}