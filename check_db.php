<?php
$host = 'server25.shared.spaceship.host';
$user = 'hwd@by1.net';
$pass = '!Maverick007!';

try {
    $conn = new PDO("mysql:host=$host", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // List all databases
    $stmt = $conn->query("SHOW DATABASES");
    echo "Available databases:\n";
    while ($row = $stmt->fetch()) {
        echo "- " . $row[0] . "\n";
    }
    
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
