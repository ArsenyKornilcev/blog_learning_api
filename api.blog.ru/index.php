<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require_once 'config/connect.php';
require_once 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1] ?? null;

switch ($method) {
    case "GET":
        if ($type === "posts") {
            getPosts($connect, $id);
        }
        break;
    case "POST":
        if ($type === "posts") {
            addPost($connect, $_POST);
        }
        break;
    case "PATCH":
        if ($type === "posts" && isset($id)) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            updatePost($connect, $id, $data);
        }
        break;
    case "DELETE":
        if ($type === "posts" && isset($id)) {
            deletePost($connect, $id);
        }
        break;
}
