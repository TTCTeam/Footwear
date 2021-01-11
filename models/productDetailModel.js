const { ObjectID } = require('mongodb');
const { db } = require('../dal/db');
var assert = require('assert')

exports.list = async () => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({}).toArray();
    return product;
}
exports.findById = async (id) => {

    const productCollection = db().collection('Procduct');
    const product = await productCollection.findOne({
        _id: ObjectID(id)
    });
    return product;
}

exports.listComment = async (filter, pageNumber, nPerPage) => {
    const commentCollection = db().collection('Comment');
    const comment = await commentCollection.find(filter)
        .limit(nPerPage)
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .toArray();
    console.log(comment);
    return comment;
}

exports.countComment = async (filter) => {
    console.log(filter);
    const commentCollection = db().collection('Comment');
    const totalComment = await commentCollection.find(filter).count();
    console.log(totalComment);
    return totalComment;
}

exports.addNewComment = async (item) => {
    const commentCollection = db().collection('Comment');
    await commentCollection.insertOne(item, function (err, result) {
        assert.strictEqual(null, err);
        console.log('Add successful');
    });
}