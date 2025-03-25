<?php
require "vendor/autoload.php"; // Install `predis/predis` dengan Composer

$redis = new Predis\Client([
    "scheme" => "tcp",
    "host" => "127.0.0.1",
    "port" => 6379
]);
?>
