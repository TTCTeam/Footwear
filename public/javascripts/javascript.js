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