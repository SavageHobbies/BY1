<?php
$host = 'server25.shared.spaceship.host';
$user = 'hwd@by1.net';
$pass = '!Maverick007!';

try {
    $conn = new PDO("mysql:host=$host", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Drop only the main by1.net database if it exists
    $stmt = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE 'by1%'");
    $databases = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($databases as $db) {
        // Skip any subdomain databases (like blog.by1.net)
        if ($db === 'by1' || $db === 'by1_net') {
            echo "Dropping database: $db\n";
            $conn->exec("DROP DATABASE IF EXISTS `$db`");
            echo "Database $db has been dropped successfully\n";
            
            // Recreate an empty database
            $conn->exec("CREATE DATABASE `$db`");
            echo "Empty database $db has been recreated\n";
        } else {
            echo "Skipping subdomain database: $db\n";
        }
    }
    
} catch(PDOException $e) {
    echo "Operation failed: " . $e->getMessage();
}
?>
