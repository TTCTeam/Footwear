const formidable = require('formidable');
const fs = require('fs');
const mv = require('mv');
const accountModel = require('../models/accountModel');

exports.renderProfile = async(req, res, next) => {
    const account = await accountModel.findByName('Ha Minh Cuong');
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
        const id = '5fcd998347acc317641c1bb8';
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