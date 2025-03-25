<?php
require "../config/database.php";
require "../config/redis.php";
require "../config/s3.php";
require "../models/Client.php";

class ClientController {
    private $pdo, $redis, $s3, $bucketName;

    public function __construct($pdo, $redis, $s3, $bucketName) {
        $this->pdo = $pdo;
        $this->redis = $redis;
        $this->s3 = $s3;
        $this->bucketName = $bucketName;
    }

    // ✅ Create Client
    public function createClient($data, $file) {
        // Upload ke S3
        $filePath = $this->uploadToS3($file);
        if (!$filePath) return ["error" => "Upload gagal"];

        // Simpan ke DB
        $sql = "INSERT INTO my_client (name, slug, is_project, self_capture, client_prefix, client_logo, address, phone_number, city)
                VALUES (:name, :slug, :is_project, :self_capture, :client_prefix, :client_logo, :address, :phone_number, :city) RETURNING *";
        $stmt = $this->pdo->prepare($sql);
        $data["client_logo"] = $filePath;
        $stmt->execute($data);
        $client = new Client($stmt->fetch(PDO::FETCH_ASSOC));

        // Simpan ke Redis
        $this->redis->set($client->slug, $client->toJson());

        return $client;
    }

    // ✅ Get Client
    public function getClient($slug) {
        $cache = $this->redis->get($slug);
        if ($cache) return json_decode($cache);

        $sql = "SELECT * FROM my_client WHERE slug = :slug AND deleted_at IS NULL";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["slug" => $slug]);
        $client = new Client($stmt->fetch(PDO::FETCH_ASSOC));

        if ($client) {
            $this->redis->set($client->slug, $client->toJson());
            return $client;
        }

        return ["error" => "Client not found"];
    }

    // ✅ Update Client
    public function updateClient($slug, $data, $file) {
        // Hapus cache Redis
        $this->redis->del($slug);

        // Upload ulang gambar jika ada
        if ($file) {
            $filePath = $this->uploadToS3($file);
            $data["client_logo"] = $filePath;
        }

        $sql = "UPDATE my_client SET name = :name, is_project = :is_project, self_capture = :self_capture, client_prefix = :client_prefix, client_logo = COALESCE(:client_logo, client_logo), address = :address, phone_number = :phone_number, city = :city, updated_at = NOW() WHERE slug = :slug RETURNING *";
        $stmt = $this->pdo->prepare($sql);
        $data["slug"] = $slug;
        $stmt->execute($data);

        $client = new Client($stmt->fetch(PDO::FETCH_ASSOC));
        $this->redis->set($client->slug, $client->toJson());

        return $client;
    }

    // ✅ Delete Client (Soft Delete)
    public function deleteClient($slug) {
        $sql = "UPDATE my_client SET deleted_at = NOW() WHERE slug = :slug";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(["slug" => $slug]);

        // Hapus dari Redis
        $this->redis->del($slug);

        return ["message" => "Client deleted"];
    }

    // ✅ Upload file ke S3
    private function uploadToS3($file) {
        try {
            $upload = $this->s3->putObject([
                "Bucket" => $this->bucketName,
                "Key"    => "uploads/" . basename($file["name"]),
                "Body"   => fopen($file["tmp_name"], "r"),
                "ACL"    => "public-read"
            ]);

            return $upload["ObjectURL"];
        } catch (Exception $e) {
            return false;
        }
    }
}
?>
