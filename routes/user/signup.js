var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'ttc.coopit@gmail.com',
        pass: '18344597',
    },
    secure: false,
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup/signup', { title: 'Signup' });
});

router.post("/", function(req, res) {
    const displayname = req.body.displayname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const retype_password = req.body.retype_password;

    const mailData = {
        from: 'ttc.coopit@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Verify your account at Footwear',
        text: 'That was easy!',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>'
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail sent", message_id: info.message_id });
    });
    res.render('/signup/signup', {
        message: "Successfully"
    })

});

module.exports = router;