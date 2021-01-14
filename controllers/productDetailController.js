const { ObjectID } = require('mongodb');
const productDetailModel = require('../models/productDetailModel');

exports.index = async (req, res, next) => {
    var pageNumber = req.query.page || 1;
    const id = req.params.id;
    const product = await productDetailModel.findById(id);
    const filter = {};
    const relatedFilter = {};
    const secondRelatedFilter = {};
    secondRelatedFilter.gender = product.gender;
    filter.productID = id;
    relatedFilter.brand = product.brand;
    const totalComment = await productDetailModel.countComment(filter);
    const tempFootwears = await productDetailModel.listRelatedProduct(relatedFilter);
    const footwears = tempFootwears.filter(item => item.name !== product.name);

    footwears.forEach(element => {
        element.cover_arr = [];
        element.cover_arr.push(element.images[0]);
    });
    const nPerPage = 3;
    let totalPage = Math.ceil(totalComment / nPerPage);
    pageNumber = (pageNumber > totalPage) ? totalPage : pageNumber;
    const comments = await productDetailModel.listComment(filter, pageNumber, nPerPage);
    var limit = (totalPage > 5) ? 5 : totalPage;
    let pagination = loadPagination(pageNumber, limit, totalPage);
    pagination.paginate.forEach(element => {
        element.productID = id;
    });
    console.log(pagination);
    res.render('product-detail', { title: product.name, product, comments, totalComment, pagination, footwears });
}

function loadPagination(pageNumber, limit, totalPage) {
    let page = [];

    let n = parseInt(pageNumber / limit);
    console.log("n" + n);
    let mid = (pageNumber % limit == 0) ? limit : (pageNumber - n * limit);
    for (let i = 0; i < mid; i++) {
        if (pageNumber % limit == 0) {
            page.push((n - 1) * limit + 1 + i);
        } else {
            page.push(n * limit + 1 + i);
        }


    }
    console.log("Page" + page);

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

exports.addNewComment = async (req, res, next) => {
    const id = req.params.id;

    const item = {
        username: req.body.username,
        content: req.body.content,
        productID: id,
        time: new Date()
    };

    productDetailModel.addNewComment(item);
    res.redirect('/footwears');
}

exports.relatedProduct = async (req, res, next) => {

}