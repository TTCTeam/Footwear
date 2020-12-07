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
exports.product = async(req, res, next) => {
    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = {};
    const nPerPage = 6;
    let totalProduct = 0;
    console.log(filter);
    console.log(pageNumber);
    console.log(nPerPage);

    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book

    totalProduct = await footwearModel.count(filter);
    console.log(totalProduct);
    let pagination = {
            page: pageNumber, // The current page the user is on
            pageCount: Math.ceil(totalProduct / nPerPage) // The total number of available pages
        }
        //pass data to view to display list of book
    res.render('footwears/list', { title: "Footwear", footwears: footwears, pagination });
}

exports.about = async(req, res, next) => {
    res.render('about', { title: "About" });

}
exports.contact = async(req, res, next) => {
    res.render('contact', { title: "Footwear - Contact" });

}
exports.men = async(req, res, next) => {

    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = {};
    const nPerPage = 6;
    let totalProduct = 0;
    console.log(filter);
    console.log(pageNumber);
    console.log(nPerPage);

    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book

    totalProduct = await footwearModel.count(filter);

    let pagination = {
        page: pageNumber, // The current page the user is on
        pageCount: Math.ceil(totalProduct / nPerPage) // The total number of available pages
    }

    res.render('gender', { title: "Men - Footwear", footwears, gender: "Men", pagination });

}
exports.women = async(req, res, next) => {
    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = {};
    const nPerPage = 6;
    let totalProduct = 0;
    console.log(filter);
    console.log(pageNumber);
    console.log(nPerPage);

    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });
    console.log(footwears);
    //pass data to view to display list of book
    totalProduct = await footwearModel.count(filter);

    let pagination = {
        page: pageNumber, // The current page the user is on
        pageCount: Math.ceil(totalProduct / nPerPage) // The total number of available pages
    }

    res.render('gender', { title: "Women - Footwear", footwears, gender: "Women", pagination });

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