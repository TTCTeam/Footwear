const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { randomInt } = require('crypto');

const userServices = require('../../models/userServices');
const accountModel = require('../../models/accountModel');
const footwearModel = require('../../models/footwearModel');
const productDetailModel = require('../../models/productDetailModel');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'ttc.coopit@gmail.com',
        pass: '18344597',
    },
    secure: true,
});

exports.isExist = async(req, res, next) => {
    res.json(await userServices.isUsernameExist(req.query.username));
}


exports.compareCode = async(req, res, next) => {
    const { code, email } = req.query;
    let user = await accountModel.findByEmail(email);
    let message = "";
    let data = {};
    if (code == user.code) {
        console.log('code bằng nhau rồi nè.');
        console.log(code);
        let newpassword = Math.random().toString(36).slice(-8);
        let mailOptions = {
            from: 'ttc.coopit@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: 'Your password was reseted', // Subject line
            text: 'This is password was made by generator. if you dont like it, you can change it after you login.', // plain text body
            html: '<h1> Your new password is here: </h1><span><b>' + newpassword + '</b></span>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

        });
        //save new password to account model

        const saltRounds = 5;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync(newpassword, salt);
        console.log(password_hash);
        //user = await accountModel.updatePassword(password_hash, user._id);
        res.locals.user = user;
        message = "Your new password was sent to your email. Pease check it and login.";
        data.err = 1;
    } else {
        message = "Your code is incorrect. Please check your email and find the latest code.";
        data.err = 0;
    }
    data.message = message;
    res.json(data);
}

exports.sendVerifyCode = async(req, res, next) => {
    const email = req.query.email;
    console.log(email);
    let user = await accountModel.findByEmail(email);
    let number_code = randomInt(1000000);
    console.log(number_code);
    console.log(user);
    let time = new Date();
    let temp_user = await accountModel.findById(user._id);
    let lasttime_code = temp_user.time;
    let time_dif = (time.getTime() - lasttime_code.getTime()) / (1000 * 60);
    console.log(time_dif);
    let mailOptions = {
        from: 'ttc.coopit@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Confirm code and Active your account', // Subject line
        text: 'Your code here:', // plain text body
        html: '<h1> Your code is here: </h1><span><b>' + number_code + '</b></span>' // html body
    };
    if (time_dif > 2) {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

        //save code to account model
        user = await accountModel.updateCode(user._id, number_code, time);
        res.locals.user = user;
    }
    res.json(user);
}

exports.accountExist_Email = async(req, res, next) => {
    res.json(await userServices.isEmailExist(req.query.email));

}

exports.productsPaging = async(req, res, next) => {
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

exports.commentsPaging = async(req, res, next) => {

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

    pagination.paginate.forEach(element => {
        element.productID = filter.productID;
    });
    let comments = {};
    comments.totalComment = listComments;
    comments.pagination = pagination;

    res.json(comments);
}

exports.addNewComment = async(req, res, next) => {

}