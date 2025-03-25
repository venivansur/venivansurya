<?php
require "vendor/autoload.php";

use Aws\S3\S3Client;

$s3 = new S3Client([
    "region" => "us-east-1",
    "version" => "latest",
    "credentials" => [
        "key"    => "your-access-key",
        "secret" => "your-secret-key",
    ]
]);

$bucketName = "your-bucket-name";
?>
