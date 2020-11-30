const { db } = require('../dal/db');
exports.list = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({}).toArray();
    return product;
}