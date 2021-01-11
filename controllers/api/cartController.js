const cartModel = require('../../models/cartModel');
const { ObjectID } = require('mongodb');

exports.cart = async (req, res, next) => {
    res.json(await cartModel.list());
}

exports.addcart = async (req, res, next) => {
    console.log(req.user);
    var cart = {
        productID: ObjectID(req.query.id),
        userID: req.user._id,
        size: req.query.size,
        width: req.query.width,
        quantity: req.query.quantity
    }
    console.log(cart);
    res.json(await cartModel.addcart(cart));
}