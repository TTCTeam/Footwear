const productDetailModel = require('../models/productDetailModel');

exports.index = async(req, res, next) => {
    const id = req.params.id;
    const product = await productDetailModel.findById(id);
    console.log(product);
    const discription = product.description.p;
    const arr = [];
    discription.forEach(element => {
        arr.push(element);
    });
    const predescription = arr[0];
    res.render('product-detail', { title: product.name, product, predescription });
}