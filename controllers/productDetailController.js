const productDetailModel = require('../models/productDetailModel');

exports.index = async(req, res, next) => {
    const id = req.params.id;
    const product = await productDetailModel.findById(id);
    console.log(product);
    res.render('product-detail', { title: product.name, product });
}