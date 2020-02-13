<?php


$conn = new mysqli('localhost:3308','root','nikosninos7','ceidpro');

if (mysqli_connect_error()) 
{
    die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
}

$conn->query ('SET CHARACTER SET utf8;');
$conn->query ('SET COLLATION_CONNECTION=utf8_general_ci;');

$sql = "INSERT INTO allusers (username, password, email)
VALUES ('John', '1234', 'john@example.com')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

echo "Success Connection!";

$conn->close();
?>
