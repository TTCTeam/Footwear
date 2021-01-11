const footwearModel = require('../models/footwearModel');

function loadPagination(pageNumber, limit, totalPage) {
    let page = [];

    let n = parseInt(pageNumber / limit);
    //console.log(n);
    let mid = (pageNumber % limit == 0) ? limit : (pageNumber - n * limit);
    for (let i = 0; i < mid; i++) {
        if (pageNumber % limit == 0) {
            page.push((n - 1) * limit + 1 + i);
        } else {
            page.push(n * limit + 1 + i);
        }


    }
    console.log(page);

    if (pageNumber % limit != 0) {
        for (let j = pageNumber - n * limit; j < limit; j++) {
            if (n * limit + 1 + j > totalPage) break;
            page.push(n * limit + 1 + j);

        }
    }


    let active = [];
    for (let k = 0; k < page.length; k++) {
        active.push("disable");
    }
    console.log(active);

    let index = page.indexOf(pageNumber);
    console.log(index);
    active[index] = "active";


    let paginate = [];
    let pagination = {};
    for (let h = 0; h < page.length; h++) {
        paginate[h] = {};
        paginate[h].page = page[h];
        paginate[h].active = active[h];
    }

    console.log(paginate);
    pagination.paginate = paginate;
    pagination.previousPage = (pageNumber == 1) ? 1 : pageNumber - 1;
    pagination.nextPage = (pageNumber == totalPage) ? pageNumber : pageNumber + 1;
    pagination.totalPage = totalPage;
    return pagination;
}
exports.index = async(req, res, next) => {
    //Get footwear from model
    const footwears = await footwearModel.list();

    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });

    //pass data to view to display list of book
    res.render('index', { title: "Footwear", footwears: footwears });
}
exports.product = async(req, res, next) => {
    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = {};
    const sort = 1;
    var searchName = "";
    if (req.query.q != undefined) {
        searchName = req.query.q;
    }

    filter.name = { $regex: searchName, $options: "$i" };

    const nPerPage = 6;
    let totalProduct = await footwearModel.count(filter);
    let totalPage = Math.ceil(totalProduct / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage, sort);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });

    var limit = (totalPage > 5) ? 5 : totalPage;
    //console.log(limit);
    let pagination = loadPagination(pageNumber, limit, totalPage);

    //pass data to view to display list of book
    res.render('footwears/list', { title: "All Product - Footwear", footwears, category: "All products", pagination });
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
    const sort = 1;
    filter.gender = "men";
    var searchName = "";
    if (req.query.q != undefined) {
        searchName = req.query.q;
    }

    filter.name = { $regex: searchName, $options: "$i" };

    const nPerPage = 6;
    let totalProduct = await footwearModel.count(filter);
    let totalPage = Math.ceil(totalProduct / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage, sort);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });


    var limit = (totalPage > 5) ? 5 : totalPage;
    //console.log(limit);

    let pagination = loadPagination(pageNumber, limit, totalPage);

    res.render('footwears/list', { title: "Men - Footwear", footwears, category: "Men", pagination });

}
exports.women = async(req, res, next) => {
    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = {};
    const sort = 1;
    filter.gender = "women";
    var searchName = "";
    if (req.query.q != undefined) {
        searchName = req.query.q;
    }

    filter.name = { $regex: searchName, $options: "$i" };

    const nPerPage = 6;
    let totalProduct = await footwearModel.count(filter);
    let totalPage = Math.ceil(totalProduct / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage, sort);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });


    var limit = (totalPage > 5) ? 5 : totalPage;
    //console.log(limit);

    let pagination = loadPagination(pageNumber, limit, totalPage);

    res.render('footwears/list', { title: "Women - Footwear", footwears, category: "Women", pagination });
}
exports.cart = async(req, res, next) => {
    var user = req.user;
    console.log(user);
    res.render('order/cart', { title: "Cart" })
}
exports.checkout = async(req, res, next) => {
    res.render('order/checkout', { title: "Check out" })
}
exports.ordercomplete = async(req, res, next) => {
    res.render('order/order-complete', { title: "Order Complete" })
}