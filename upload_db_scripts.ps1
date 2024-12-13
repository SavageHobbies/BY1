$ftpUrl = "ftp://server25.shared.spaceship.host"
$username = "hwd@by1.net"
$password = "!Maverick007!"

# Upload check_db.php
Write-Host "Uploading check_db.php..."
curl.exe --connect-timeout 30 --max-time 60 --user "$username`:$password" --upload-file "check_db.php" --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/public_html/check_db.php"

# Upload clear_db.php
Write-Host "Uploading clear_db.php..."
curl.exe --connect-timeout 30 --max-time 60 --user "$username`:$password" --upload-file "clear_db.php" --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/public_html/clear_db.php"
