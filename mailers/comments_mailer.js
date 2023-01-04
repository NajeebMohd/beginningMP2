const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside the newComment mailer...',comment.user.email);
    nodeMailer.transporter.sendMail({
        from : 'jscheck170@gmail.com',
        to : comment.user.email,
        subject : 'new comment has been published',
        html : '<h1> yeah! your comment is published </h1>'
    },(err,info) => {
        if(err){console.log('Error in sending mail ',err);return;}
        console.log('message send! ',info);
        return;
    });
}