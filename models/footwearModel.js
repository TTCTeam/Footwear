const { db } = require('../dal/db');
exports.list = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({}).toArray();
    return product;
}

exports.paging = async(filter, pageNumber, nPerPage) => {

    const product = await db().collection('Procduct').find(filter)
        .limit(nPerPage)
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .toArray();

    return product;
}

exports.count = async() => {
    const productCollection = db().collection('Procduct');
    return await productCollection.find({}).count();
}