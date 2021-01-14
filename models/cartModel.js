const { db } = require('../dal/db');
const assert = require('assert');
const productDetailModel = require('./productDetailModel');
const { cart } = require('../controllers/footwearsController');
const { ObjectId } = require('mongodb');

exports.list = async () => {
    const cartCollection = db().collection('Cart');
    const cart = await cartCollection.find({}).toArray();
    return cart;
}

exports.getCartsByUserID = async (userID) => {
    const cartCollection = db().collection('Cart');
    const carts = await cartCollection.find({userID}).toArray();

    for (const item of carts) {
        item.product = await productDetailModel.findById(item.productID);
        item.intoMoney = item.product.price * item.quantity;
        item.cover_image = item.product.images[0];
    }
    
    return carts;
}

exports.addcart = async (cart) => {
    const cartCollection = db().collection('Cart');
    var res = true;
    await cartCollection.insertOne(cart, function (err, result) {
        assert.strictEqual(null, err);
        res = false;
    });
    var count = await cartCollection.find({"userID": cart.userID}).count();
    return { count, res };
}

exports.removecart = async (cart) => {
    console.log(cart);
    const cartCollection = db().collection('Cart');
    await cartCollection.deleteOne(cart, function (err, result) {
        assert.strictEqual(null, err);
    });
    var count = await cartCollection.find({"userID": cart.userID}).count();
    var carts = await this.getCartsByUserID(cart.userID);
    return { count, carts };
}