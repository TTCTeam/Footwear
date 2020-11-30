const { ObjectID } = require('mongodb');
const { db } = require('../dal/db');

exports.list = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({}).toArray();
    return product;
}
exports.findById = async(id) => {

    const productCollection = db().collection('Procduct');
    const product = await productCollection.findOne({
        _id: ObjectID(id)
    });
    return product;
}