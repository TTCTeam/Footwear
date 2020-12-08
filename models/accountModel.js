const { ObjectID } = require('mongodb');
const { db } = require('../dal/db');
var assert = require('assert')

exports.list = async() => {
    const accountCollection = db().collection('Account');
    const account = await accountCollection.find({}).toArray();
    return account;
}

exports.paging = async(filter, pageNumber, nPerPage) => {

    const account = await db().collection('Account').find(filter)
        .limit(nPerPage)
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .toArray();

    return account;
}

exports.count = async(filter) => {
    const accountCollection = db().collection('Account');
    return await accountCollection.find(filter).count();
}

exports.findById = async(id) => {

    const productCollection = db().collection('Account');
    const product = await productCollection.findOne({
        _id: ObjectID(id)
    });
    return product;
}

exports.findByName = async(name) => {

    const productCollection = db().collection('Account');
    const product = await productCollection.findOne({
        fullname: { $regex: name, $options: "$i" }
    });
    return product;
}

exports.updateOne = async(account, id) => {
    const productCollection = db().collection('Account');
    await productCollection.updateOne({ _id: ObjectID(id) }, {
        $set: {
            username: account.username,
            fullname: account.fullname,
            email: account.email,
            telephone: account.telephone,
            age: account.age,
            address: account.address,
            gender: account.gender,
            avatar: account.avatar
        }
    });
}