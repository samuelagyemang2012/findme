function loadMap() {
    window.open("map.html", "_parent");
}

function send_request(url) {
    "use strict";
    var obj, result;
    obj = $.ajax({
        url: url,
        async: false
    });
    result = $.parseJSON(obj.responseText);
    return result;
}

function change_page(page, transition) {
    $.mobile.pageContainer.pagecontainer("change", page, {transition: transition});
}

function fake_sign_up() {
    var username, password, email, phone, url, result;

    username = $("#s_username").val();
    password = $("#s_password").val();
    email = $("#s_email").val();
    phone = $("#s_phone").val();

    url = "./phpscripts/controller.php?cmd=1&username=" + username + "&password=" + password + "&email=" + email + "&phone=" + phone;

    result = send_request(url);

    if (result.result == 1) {
        change_page("#verifypage", "slide");
    }
}