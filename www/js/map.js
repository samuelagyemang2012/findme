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
    //change_page("#verifypage", "slide");


    if (result.result == 1) {
        change_page("#verifypage", "slide");
    }
}

function true_sign_up() {
    var code, url, result;

    code = $("#code").val();

    url = "./phpscripts/controller.php?cmd=2&code=" + code;

    result = send_request(url);

    if (result.result == 1) {
        $("#verified").popup("open", {transition: "pop"});

        setTimeout(
            function () {
                change_page("#loginpage", "slide")
            }, 800);
    } else {
        $("#notverified").popup("open", {transition: "pop"});
    }
    //alert("dadsadsa");
}

function login() {
    var email, password, url, result;

    email = $("#email").val();
    password = $("#password").val();

    url = "./phpscripts/controller.php?cmd=3&email=" + email + "&password=" + password;

    result = send_request(url);

    if (result.result == 1) {
        loadMap();
    }
    else {
        $("#ll").popup("open", {transition: "pop"});
    }
}