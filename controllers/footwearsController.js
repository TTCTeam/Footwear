const footwearModel = require('../models/footwearModel');

exports.index = async(req, res, next) => {
    //Get footwear from model
    const footwears = await footwearModel.list();

    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book
    res.render('index', { title: "Footwear", footwears: footwears });
}

exports.about = async(req, res, next) => {
    res.render('about', { title: "About" });

}
exports.contact = async(req, res, next) => {
    res.render('contact', { title: "Footwear - Contact" });

}
exports.men = async(req, res, next) => {

    //Get footwear from model
    const footwears = await footwearModel.list();

    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book

    res.render('gender', { title: "Men - Footwear", footwears, gender: "Men" });

}
exports.women = async(req, res, next) => {
    /* Gọi database filter theo gender */
    //Get footwear from model
    const footwears = await footwearModel.list();

    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book

    res.render('gender', { title: "Women - Footwear", footwears, gender: "Women" });

}
exports.cart = async(req, res, next) => {
    res.render('order/cart', { title: "Cart" })
}
exports.checkout = async(req, res, next) => {
    res.render('order/checkout', { title: "Check out" })
}
exports.ordercomplete = async(req, res, next) => {
    res.render('order/order-complete', { title: "Order Complete" })
}