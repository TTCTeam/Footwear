const formidable = require('formidable');
const fs = require('fs');
const mv = require('mv');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const accountModel = require('../models/accountModel');
const userServices = require('../models/userServices');
const { randomInt } = require('crypto');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'ttc.coopit@gmail.com',
        pass: '18344597',
    },
    secure: true,
});




exports.renderProfile = async(req, res, next) => {
    const id = req.params.id;
    const account = await accountModel.findById(id);
    let men, women;
    if (account.gender == "male" || account.gender == "men") {
        men = "checked";
    } else {
        women = "checked";
    }
    res.render('user/edit', { title: 'Update Profile', account, men, women });
}

exports.updateProfile = async(req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if (files.avatarfile && files.avatarfile.size > 0) {
            var fileName = files.avatarfile.path.split('\\').pop() + '.' + files.avatarfile.name.split('.').pop();
            console.log(fileName);
            mv(files.avatarfile.path, process.env.USER_FOLDER_IMAGES + '\\' + fileName, function(error) {
                if (error) throw error;

            });
            fields.avatar = '/images/users/' + fileName;
        }
        const id = req.params.id;
        accountModel.updateOne(fields, id).then(() => {
            accountModel.findById(id).then((account) => {
                let men, women;
                if (account.gender == "male" || account.gender == "men") {
                    men = "checked";
                } else {
                    women = "checked";
                }
                res.render('user/edit', { title: 'Update Profile', account, men, women });
            });
        });
    });
}

exports.addUser = async(req, res, next) => {
    const { displayname, username, email, password, retype_password } = req.body;

    const newUser = {
        username,
        email,
        password
    }
    newUser.fullname = displayname;
    try {

        const saltRounds = 2;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        newUser.age = "2000";
        newUser.telephone = "+84..";
        newUser.gender = "";
        newUser.address = "";
        newUser.avatar = "/images/users/user.png";

        console.log(newUser);

        await userServices.addUser(newUser);
        res.redirect("/users/login");
    } catch (err) {
        res.render('signup/signup', {
            title: "Sign up",
            err: "You can create an account right now. Try again later!!!."
        });
    }
}

exports.active = async(req, res, next) => {

    let user = req.user;

    let number_code = randomInt(1000000);
    console.log(number_code);
    let time = new Date();
    let temp_user = await accountModel.findById(user._id);
    let lasttime_code = temp_user.time;
    let time_dif = (time.getTime() - lasttime_code.getTime()) / (1000 * 60);
    console.log(time_dif);
    let mailOptions = {
        from: 'ttc.coopit@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Confirm code and Active your account', // Subject line
        text: 'Your code here:', // plain text body
        html: '<h1> Your code is here: </h1><span><b>' + number_code + '</b></span>' // html body
    };
    if (time_dif > 2) {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

        });
        //save code to account model
        user = await accountModel.updateCode(user._id, number_code, time);
        res.locals.user = user;

    }
    res.render('user/active', { title: 'Active account' });
}

exports.activeUser = async(req, res, next) => {
    let code = req.body.code;
    const user = req.user;
    console.log(user);
    const account = await accountModel.findById(user._id);
    code = parseInt(code);

    console.log(code);
    console.log(user.code);

    if (code == account.code) {
        const result = await accountModel.updateStatus(account._id, "actived");
        res.locals.user = result;
        console.log(result);
        res.redirect('/cart');
    } else {
        res.render('user/active', { title: 'Active account', message: "Code vừa nhập không chính xác." });
    }
}