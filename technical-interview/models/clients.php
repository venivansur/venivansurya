<?php
class Client {
    public $id, $name, $slug, $is_project, $self_capture, $client_prefix, $client_logo, $address, $phone_number, $city, $created_at, $updated_at, $deleted_at;

    public function __construct($data) {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }

    public function toJson() {
        return json_encode(get_object_vars($this));
    }
}
?>
