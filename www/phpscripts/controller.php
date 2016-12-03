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

        case 2:
            sign_up();
            break;

        case 3:
            login();
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
    $user = new User();

    $usercode = $_GET['code'];

    $user_email = $user->get_email_from_code($usercode);

    if ($user_email == $_SESSION['email']) {

        $bool = $user->sign_up($_SESSION['username'], $_SESSION['password'], $_SESSION['email'], $_SESSION['phone']);

        if ($bool == true) {
            echo '{"result":1}';
        } else {
            echo '{"result":0}';
        }
    }
}

function login()
{
    $user = new User();

    $email = $_GET['email'];
    $password = $_GET['password'];

    $data = $user->login($email, $password);

    $row = $data->fetch_assoc();

    $r_email = $row['email'];
    $r_pass = $row['password'];

    if ($email == $r_email && $password === $r_pass) {
        echo '{"result":1}';
    } else {
        echo '{"result":0}';
    }
}