const orderModel = require('../models/orderModel');

exports.cart = async (req, res, next) => {
    var user = req.user;
    console.log(user._id);
    var { carts, subtotal } = await orderModel.getCartsByUserID(user._id);
    console.log(carts);
    const total = subtotal;
    res.render('order/cart', { title: "Cart", carts, subtotal, total })
}
exports.checkout = async (req, res, next) => {
    var user = req.user;
    console.log(user._id);
    var { carts, subtotal } = await orderModel.getCartsByUserID(user._id);
    console.log(carts);
    const total = subtotal;
    res.render('order/checkout', { title: "Check out", user, subtotal, total })
}
exports.ordercomplete = async (req, res, next) => {
    res.render('order/order-complete', { title: "Order Complete" })
}

exports.payment = async (req, res, next) => {
    let bill = {
        userID: req.user._id,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        address: req.body.address,
        address2: req.body.address2,
        town: req.body.town,
        province: req.body.province,
        email: req.body.email,
        paymentmethod: req.body.paymentmethod,
        status: '0'
    }
    bill.carts = await orderModel.getCartsByUserID(bill.userID);
    console.log(bill);
    await orderModel.insertBill(bill);
    await orderModel.removeCartsByUserID(bill.userID);
    res.redirect('/order/ordercomplete');
}

exports.bill = async (req, res, next) => {
    var user = req.user;

    var statusparam = req.params.status || 0;
    var billCarts = await orderModel.getBillCartsByUserID(user._id, statusparam);
    var preparing, delivering, delivered;
    if (statusparam == '0') {
        preparing = 'active';
    }
    if (statusparam == '1') {
        delivering = 'active';
    }
    if (statusparam == '2') {
        delivered = 'active';
    }
    console.log("dcm");
    res.render('order/bill', { title: "Bill", carts: billCarts, status: { preparing, delivering, delivered } });
}