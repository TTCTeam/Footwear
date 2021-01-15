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
    const carts = await cartCollection.find({ userID }).toArray();
    var subtotal = 0;
    for (const item of carts) {
        item.product = await productDetailModel.findById(item.productID);
        item.intoMoney = item.product.price * item.quantity;
        subtotal += item.intoMoney;
        item.cover_image = item.product.images[0];
    }

    return {carts, subtotal};
}

exports.addcart = async (cart) => {
    const cartCollection = db().collection('Cart');
    var res = true;
    await cartCollection.insertOne(cart, function (err, result) {
        assert.strictEqual(null, err);
        res = false;
    });
    var count = await cartCollection.find({ "userID": cart.userID }).count();
    return { count, res };
}

exports.removecart = async (cart) => {
    console.log(cart);
    const cartCollection = db().collection('Cart');
    await cartCollection.deleteOne(cart, function (err, result) {
        assert.strictEqual(null, err);
    });
    var count = await cartCollection.find({ "userID": cart.userID }).count();
    var {carts, subtotal} = await this.getCartsByUserID(cart.userID);
    return { count, carts, subtotal };
}

exports.insertBill = async (bill) => {
    const billCollection = db().collection('Bill');
    var res = true;
    await billCollection.insertOne(bill, function (err, result) {
        assert.strictEqual(null, err);
        res = false;
    });
    return res;
}

exports.removeCartsByUserID = async (userID) => {
    const cartCollection = db().collection('Cart');
    var res = true;
    await cartCollection.deleteMany({userID}, function (err, result) {
        assert.strictEqual(null, err);
        res = false;
    });
    return res;
}

exports.getBillCartsByUserID= async (userID, status) => {
    const billCollection = db().collection('Bill');
    let filter= {userID, status};
    console.log(filter);
    const bills = await billCollection.find(filter).toArray();
    let carts=[];
    bills.forEach( bill => {
        bill.carts.carts.forEach(element => {
            carts.push(element);
        });
    });
    return carts;
}