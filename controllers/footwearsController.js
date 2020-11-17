const footwearModel = require('../models/footwearModel');

exports.index = (req, res, next) => {
    //Get footwear from model
    const footwears = footwearModel.list();
    //pass data to view to display list of book
    res.render('footwears/list', { footwears });

}