const userServices = require('../../models/userServices');
const footwearModel = require('../../models/footwearModel');
const productDetailModel = require('../../models/productDetailModel');

exports.isExist = async (req, res, next) => {
    res.json(await userServices.isUsernameExist(req.query.username));
}

exports.productsPaging = async (req, res, next) => {
    var pageNumber = req.query.page || 1;
    //ten color brand style material price
    const filter = req.query.filter || {};
    let sort = req.query.sort || 1;
    sort = parseInt(sort);
    console.log(filter);
    console.log("Gia tri sort nhan vao ne: ");
    console.log(sort);

    var searchName = "";
    if (req.query.q != undefined) {
        searchName = req.query.q;
    }

    filter.name = { $regex: searchName, $options: "$i" };

    const nPerPage = 6;


    let totalProduct = await footwearModel.count(filter);
    let totalPage = Math.ceil(totalProduct / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    pageNumber = parseInt(pageNumber);
    //Get footwear from model
    const footwears = await footwearModel.paging(filter, pageNumber, nPerPage, sort);
    //footwears.cover_arr = [];
    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);

    });

    var limit = (totalPage > 5) ? 5 : totalPage;
    //console.log(limit);
    let n = parseInt(pageNumber / limit);
    let page = [];
    console.log(n);
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
    let products = {};
    products.footwears = footwears;
    products.pagination = pagination;

    console.log(products.footwears);
    console.log(products.pagination);
    res.json(products);
}

exports.commentsPaging = async (req, res, next) => {

    var pageNumber = req.query.page || 1;
    const filter = req.query.filter || {};

    let totalComments = await productDetailModel.countComment(filter);
    const nPerPage = 3;
    let totalPage = Math.ceil(totalComments / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    pageNumber = parseInt(pageNumber);
    const listComments = await productDetailModel.listComment(filter, pageNumber, nPerPage);

    var limit = (totalPage > 5) ? 5 : totalPage;
    //console.log(limit);
    let n = parseInt(pageNumber / limit);
    let page = [];
    console.log("Page Number: " + pageNumber);
    let mid = (pageNumber % limit == 0) ? limit : (pageNumber - n * limit);
    for (let i = 0; i < mid; i++) {
        if (pageNumber % limit == 0) {
            page.push((n - 1) * limit + 1 + i);
        } else {
            page.push(n * limit + 1 + i);
        }


    }
    console.log("current page: " + page);

    if (pageNumber % limit != 0) {
        for (let j = pageNumber - n * limit; j < limit; j++) {
            if (n * limit + 1 + j > totalPage) break;
            page.push(n * limit + 1 + j);

        }
    }

    console.log("current page: " + page);

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

    pagination.paginate = paginate;
    pagination.previousPage = (pageNumber == 1) ? 1 : pageNumber - 1;
    pagination.nextPage = (pageNumber == totalPage) ? pageNumber : pageNumber + 1;
    pagination.totalPage = totalPage;
    let comments = {};
    comments.totalComment = listComments;
    comments.pagination = pagination;

    res.json(comments);
}

exports.addNewComment = async (req, res, next) => {

}
