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

    let color = document.querySelector('input[name="color"]:checked');
    let style = document.querySelector('input[name="style"]:checked');
    let brand = document.querySelector('input[name="brand"]:checked');
    let material = document.querySelector('input[name="material"]:checked');
    let width = document.querySelector('input[name="width"]:checked');
    let filter = {};
    if (color != null) {
        color = color.value;
        filter.color = color;
    }
    if (style != null) {
        style = style.value;
        filter.style = style;
    }
    if (brand != null) {
        brand = brand.value;
        filter.brand = brand;
    }
    if (material != null) {
        material = material.value;
        filter.material = material;
    }
    if (width != null) {
        width = width.value;
        filter.width = width;
    }
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
    $.getJSON('/api/users/paging', { page, category, filter }, function(data) {
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