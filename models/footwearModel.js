const { db } = require('../dal/db');
exports.list = async() => {
    const productCollection = db().collection('Procduct');
    const product = await productCollection.find({}).toArray();
    return product;
}

exports.paging = async(filter, pageNumber, nPerPage) => {


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