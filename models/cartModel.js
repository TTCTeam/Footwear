const { db } = require('../dal/db');
const assert = require('assert')

exports.list = async () => {
    const cartCollection = db().collection('Cart');
    const cart = await cartCollection.find({}).toArray();
    return cart;
}

exports.addcart = async (cart) => {
    const cartCollection = db().collection('Cart');
    console.log(cart);
    var res = true;
    await cartCollection.insertOne(cart, function (err, result) {
        assert.strictEqual(null, err);
        res = false;
    });
    var count = await cartCollection.find({}).count();
    return { count, res };
}