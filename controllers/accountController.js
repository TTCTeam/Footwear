const formidable = require('formidable');
const fs = require('fs');
const mv = require('mv');
const bcrypt = require('bcrypt');
const accountModel = require('../models/accountModel');
const userServices = require('../models/userServices');
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

        const saltRounds = 18;
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