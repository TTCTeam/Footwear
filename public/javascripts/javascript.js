function preSignUp() {
    const displayame = $('#display_name').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const retype_password = $('#retype_password').val();
    var notif = document.getElementById("notif");
    console.log(displayame);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(retype_password);
    if (password != retype_password) {
        notif.innerHTML = "Your password and retype are not mach.";
        return false;
    }
    return true;
};

function replaceInputCode() {
    let email = $('#email').val();
    let code = $('#code').val();
    let input_email = document.getElementById('input-email');
    let input_code = document.getElementById('input-code');
    if (input_email.style.display != 'none') {
        $.getJSON('/api/users/is-exist-email', { email }, function(data) {
            if (data == true) {
                console.log(data);
                input_email.style.display = 'none';
                input_code.style.display = 'block';
            } else {
                $('#email-info').addClass('error').removeClass('success').html('Email is not exist!');
                $(":submit").attr("disabled", true);
            }
        });
        $.getJSON('/api/users/sendverifycode', { email }, function(data) {

        });
    } else {

    }

}

function checkValidPassword_Retype() {
    const password = $('#newpassword').val();
    const retype_password = $('#retypepassword').val();
    var notif = document.getElementById("notif");
    console.log(password);
    console.log(retype_password);
    if (password != retype_password) {
        notif.innerHTML = "Your password and retype are not mach.";
        return false;
    }
    return true;
}

function checkExistUsername(username) {
    // call server api to check username availability
    $.getJSON('/api/users/is-exist', { username }, function(data) {
        if (data == true) {

            $('#username-info').addClass('error').removeClass('success').html('Username is aldready taken!');
            $(":submit").attr("disabled", true);
        } else {
            $('#username-info').addClass('success').removeClass('error').html('You can take this username!');
            $(":submit").removeAttr("disabled");
        }

    });
}

function checkExistEmail(email) {

    $.getJSON('/api/users/is-exist-email', { email }, function(data) {
        if (data == true) {
            console.log(data);
            if ($('#email-info').hasClass('forgotpassword') == true) {
                $('#email-info').addClass('success').removeClass('error').html('Email is exist!');
                $(":submit").removeAttr("disabled");
            } else {
                $('#email-info').addClass('error').removeClass('success').html('Email is aldready taken!');
                $(":submit").attr("disabled", true);
            }
        } else {
            if ($('#email-info').hasClass('forgotpassword') == true) {
                $('#email-info').addClass('error').removeClass('success').html('Email is not exist!');
                $(":submit").attr("disabled", true);
            } else {
                $('#email-info').addClass('success').removeClass('error').html('You can take this username!');
                var check = $("#username-info").hasClass('success');
                if (check == true) {
                    $(":submit").removeAttr("disabled");
                }
            }
        }
    });
}

function replaceProducts(page) {
    let brand = [];
    $('input[name="brand"]:checked').each(function() {
        brand.push(this.value);
    });
    console.log(brand);
    let color = [];
    $('input[name="color"]:checked').each(function() {
        color.push(this.value);
    });
    let style = [];
    $('input[name="style"]:checked').each(function() {
        style.push(this.value);
    });
    let material = [];
    $('input[name="material"]:checked').each(function() {
        material.push(this.value);
    });
    let width = [];
    $('input[name="width"]:checked').each(function() {
        width.push(this.value);
    });
    let sort = document.querySelector('input[name="sort"]:checked');

    let filter = {};
    if (color != null) {
        filter.color = { $in: color };
    }
    if (style != null) {

        filter.style = { $in: style };
    }
    if (brand != null) {

        filter.brand = { $in: brand };
    }
    if (material != null) {

        filter.material = { $in: material };
    }
    if (width != null) {

        filter.width = { $in: width };
    }
    if (sort != null) {
        sort = parseInt(sort.value);
    } else {
        sort = 1;
    }
    console.log(sort);
    console.log(filter);

    let category = $('#category').html();
    category = category.toLowerCase();
    console.log(category);
    if (category != "all products") {
        filter.gender = category;
    }
    if (page == "current") {
        let page1 = $('.active.page a').html() || 1;
        console.log(page1);
        page = parseInt(page1);
    }

    //call server API to render products
    //đối số data truyền vào để gửi về server
    $.getJSON('/api/users/paging', { page, category, filter, sort }, function(data) {
        // // compile the template
        let template = Handlebars.compile($('#products').html());
        // // execute the compiled template and print the output to the console
        let products = data.footwears;
        let product_html = template({ products });
        $('#product-list-template').html(product_html);

        let template_nav_paging = Handlebars.compile($('#paging-nav-template').html());
        let pagination = data.pagination;
        let paging_nav_html = template_nav_paging({ pagination });
        $('#paging-nav').html(paging_nav_html);

    });

}

function replaceComments(page, productID) {

    let filter = {};

    filter.productID = productID;

    if (page == "current") {
        let page1 = $('.active.page a').html() || 1;
        console.log(page1);
        page = parseInt(page1);
    }

    $.getJSON('/api/users/pagingComment', { page, filter }, function(data) {
        // // compile the template
        let template = Handlebars.compile($('#comments').html());
        // // execute the compiled template and print the output to the console
        let comments = data.totalComment;
        let comment_html = template({ comments });
        $('#comment-list-template').html(comment_html);

        let template_nav_paging = Handlebars.compile($('#paging-nav-template').html());
        let pagination = data.pagination;
        let paging_nav_html = template_nav_paging({ pagination });
        $('#paging-nav').html(paging_nav_html);
    });
}

function replaceCartItems() {
    $.getJSON('/api/order/cart', {}, function(cart) {
        // // compile the template
        let template = Handlebars.compile($('#cart_list_items').html());
        // // execute the compiled template and print the output to the console
        console.log(cart);
        let cart_html = template({ cart });
        console.log(cart_html);
        $('#cart_list_items_template').html(cart_html);
    });
}

function minusQuantity() {
    let value = document.getElementById("quantity").value - 0;
    if (value > 1) {
        value--;
    }
    document.getElementById("quantity").value = value;
}

function plusQuantity() {
    let value = document.getElementById("quantity").value - 0;
    if (value < 50) {
        value++;
    }
    document.getElementById("quantity").value = value;
}

function requestLogin() {
    var result = confirm("Please log in to continue.");
    if (result) {
        location.replace("/users/login");
    }
}

function addToCart(id) {
    const size = $('input[name="size"]:checked').val();
    const width = $('input[name="width"]:checked').val();
    const quantity = document.getElementById("quantity").value - 0;
    if (size == undefined || width == undefined || quantity == 0) {
        alert("Please fill out all field.");
        return;
    }
    console.log(size);
    $.getJSON('/api/order/addcart', { id, size, width, quantity }, function(result) {
        console.log(result.count);
        console.log(result.res);
        $("span[name='num-of-cart']").each(function() {
            this.innerText = result.count;
        });
        if (result.res == true) {
            alert("Add to cart sucessfully.");
        } else {
            alert("Add to cart failed.");
        }
    });
}

function removeFromCart(id) {
    $.getJSON('/api/order/removecart', { id }, function (result) {
        console.log(result);
        $("span[name='num-of-cart']").each(function () {
            this.innerText = result.count;
        });
        // // compile the template
        let template = Handlebars.compile($('#cart_list_items').html());
        // // execute the compiled template and print the output to the console
        let carts = result.carts;
        let cart_html = template({ carts });
        console.log(cart_html);
        $('#cart_list_items_template').html(cart_html);
    });
}
