<?php
/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 12/2/2016
 * Time: 6:30 AM
 */
session_start();

include_once "User.php";
//include_once "Pool.php";

if (isset($_REQUEST['cmd'])) {

    $command = $_REQUEST['cmd'];

    switch ($command) {
        case 1:
            temporal_sign_up();
            break;


        default:
            break;
    }
}

function temporal_sign_up()
{
    $user = new User();

    //generate code
    $code = $user->generate_code();

    //get data
    $username = $_GET['username'];
    $password = $_GET['password'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];

    //session data
    $_SESSION['username'] = $username;
    $_SESSION['password'] = $password;
    $_SESSION['email'] = $email;
    $_SESSION['phone'] = $phone;
    $_SESSION['code'] = $code;

    $bool = $user->fake_sign_up($email, $code);
    if ($bool == true) {
        $user->send_code($code, $phone);
        echo '{"result": 1}';
    } else {
        echo '{"result": 0}';
    }
}

function sign_up()
{

}