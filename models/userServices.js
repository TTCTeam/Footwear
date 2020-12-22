const { ObjectID } = require('mongodb');
const bcrypt = require('bcrypt');
const { db } = require('../dal/db');

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
        email: usernameOrEmail
    });
    const hasUsername = await accountCollection.findOne({
        username: usernameOrEmail
    });
    let user = hasEmail || hasUsername;
    if (user) {
        const check = await bcrypt.compareSync(password, user.password);
        if (!check) {
            err = 0;
        } else if (user.status == "blocked") {
            err = -1;
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