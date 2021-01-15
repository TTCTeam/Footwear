const { ObjectID } = require('mongodb');
const bcrypt = require('bcrypt');
const { db } = require('../dal/db');
const assert = require('assert');

exports.isEmailExist = async(email) => {
    const accountCollection = db().collection('Account');
    const account = await accountCollection.findOne({
        email: email
    });
    return (account == undefined || account.status == "blocked") ? false : true;
}

exports.isCorrectPassword = async(password, id) => {
    const accountCollection = db().collection('Account');
    const account = await accountCollection.findOne({
        _id: ObjectID(id)
    });
    if (account) {
        const check = await bcrypt.compareSync(password, account.password);
        if (check) {
            return true;
        }
    }
    return false;
}

exports.addUser = async(newUser) => {
    const accountCollection = db().collection('Account');

    await accountCollection.insertOne(newUser, function(err, result) {
        assert.strictEqual(null, err);
        console.log('Add successful');
    });

}

exports.checkCredential = async(usernameOrEmail, password) => {
    const accountCollection = db().collection('Account');
    let err = 1;
    const hasEmail = await accountCollection.findOne({
        email: usernameOrEmail,
        type: "user",
        status: { $in: ["active", "actived"] }
    });
    const hasUsername = await accountCollection.findOne({
        username: usernameOrEmail,
        type: "user",
        status: { $in: ["active", "actived"] }
    });
    let user = hasEmail || hasUsername;
    console.log("user");
    console.log(user);
    if (user) {
        const check = await bcrypt.compareSync(password, user.password);
        console.log(check);
        if (!check) {
            return err = 0;
        } else if (user.status == "blocked") {
            return err = -1;
        }
    }
    return user;
}

exports.findById = async(id) => {

    const accountCollection = db().collection('Account');
    const account = await accountCollection.findOne({
        _id: ObjectID(id)
    });
    return account;
}

exports.isUsernameExist = async(username) => {
    const accountCollection = db().collection('Account');
    const account = await accountCollection.findOne({
        username: username
    });
    return (account == undefined) ? false : true;
}