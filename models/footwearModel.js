const { db } = require('../dal/db');
exports.list = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({
        delete: false
    }).toArray();
    return product;
}
exports.listBestSeller = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({
        delete: false
    }).sort({ sold: -1 }).limit(6).toArray();
    return product;
}

exports.paging = async(filter, pageNumber, nPerPage, sort) => {

    const product = await db().collection('Procduct').find(filter).sort({ name: sort })
        .limit(nPerPage)
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .toArray();
    return product;
}

exports.count = async(filter) => {
    const productCollection = db().collection('Procduct');
    return await productCollection.find(filter).count();
}