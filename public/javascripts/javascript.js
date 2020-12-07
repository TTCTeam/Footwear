function preSignUp() {
    const displayame = $('#display_name').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const retype_password = $('#retype_pasword').val();
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