<?php
require "../controllers/ClientController.php";

$controller = new ClientController($pdo, $redis, $s3, $bucketName);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo json_encode($controller->createClient($_POST, $_FILES["client_logo"]));
} elseif ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["slug"])) {
    echo json_encode($controller->getClient($_GET["slug"]));
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    parse_str(file_get_contents("php://input"), $putData);
    echo json_encode($controller->updateClient($_GET["slug"], $putData, $_FILES["client_logo"] ?? null));
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    echo json_encode($controller->deleteClient($_GET["slug"]));
}
?>
