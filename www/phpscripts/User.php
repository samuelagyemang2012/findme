<?php

/**
 * Created by PhpStorm.
 * User: samuel
 * Date: 12/2/2016
 * Time: 4:14 AM
 */
include_once('Adb.php');

class User extends Adb
{

    public function generate_code()
    {
        $vcode = mt_rand(1000, 9999);
        return $vcode;
    }

    public function fake_sign_up($email, $code)
    {
        $query = "INSERT INTO verification(email,code) VALUES (?,?)";
        $s = $this->prepare($query);
        $s->bind_param('si', $email, $code);
        $bool = $s->execute();
        return $bool;
    }

    public function send_code($code, $phone)
    {
        $c = urlencode($code);
//        $p = urlencode($phone);
        $l = "LOST?";
        $ll = urlencode($l);

        $url = "http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=" . $phone . "&from=" . $ll . "&text=Your+verification+code+is+" . $c;
        $curl = curl_init($url);
        curl_exec($curl);
        curl_close($curl);
    }


    public function sign_up($username, $password, $email, $phone)
    {
        $query = "INSERT INTO users(username,email,password,phone) VALUES (?,?,?,?)";
        $s = $this->prepare($query);
        $s->bind_param('sssi', $username, $email, $password, $phone);
        $bool = $s->execute();
        return $bool;
    }


    public function get_email_from_code($code)
    {
        $query = "SELECT email FROM verification WHERE code=?";
        $s = $this->prepare($query);
        $s->bind_param('i', $code);
        $s->execute();
        return $s->get_result();
    }

    public function login($email, $password)
    {
        $query = "SELECT email,password FROM users WHERE email=? AND password=?";
        $s = $this->prepare($query);
        $s->bind_param('ss', $email, $password);
        $bool = $s->execute();
        return $bool;
    }
}

//$u = new User();
//$u->send_code("1232", 233542688902);
