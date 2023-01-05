const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from : 'jscheck170@gmail.com',
        to : comment.user.email,
        subject : 'new comment has been published',
        html : htmlString
    },(err,info) => {
        if(err){console.log('Error in sending mail ',err);return;}
        console.log('message send! ',info);
        return;
    });
}