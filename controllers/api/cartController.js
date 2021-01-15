const cartModel = require('../../models/orderModel');
const { ObjectID } = require('mongodb');

exports.cart = async (req, res, next) => {
    res.json(await cartModel.list());
}

exports.addcart = async (req, res, next) => {
    console.log(req.user);
    const date=new Date();
    var cart = {
        productID: ObjectID(req.query.id),
        userID: req.user._id,
        size: req.query.size,
        width: req.query.width,
        quantity: req.query.quantity,
        date
    }
    console.log(cart);
    res.json(await cartModel.addcart(cart));
}

exports.removecart = async (req, res, next) => {
    var cart = {
        _id: ObjectID(req.query.id),
        userID: req.user._id,
    }
    res.json(await cartModel.removecart(cart));
}