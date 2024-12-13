$ftpUrl = "ftp://server25.shared.spaceship.host"
$username = "hwd@by1.net"
$password = "!Maverick007!"

# Create and upload .htaccess
$htaccessContent = @"
DirectoryIndex index.html
RewriteEngine On
RewriteBase /

# Handle Next.js static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /404.html [L]

# Prevent directory listings
Options -Indexes
"@

Set-Content -Path ".htaccess" -Value $htaccessContent

Write-Host "Uploading .htaccess..."
curl.exe --connect-timeout 30 --max-time 60 --user "$username`:$password" --upload-file ".htaccess" --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/public_html/.htaccess"

# Upload all files from the out directory
$outPath = "out"
$files = Get-ChildItem -Path $outPath -Recurse -File

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Resolve-Path $outPath).Path.Length + 1)
    $remotePath = $relativePath.Replace("\", "/")
    
    Write-Host "Uploading $relativePath..."
    
    # Handle special case for [slug] directory
    if ($remotePath -match "\[slug\]") {
        $remotePath = $remotePath.Replace("[slug]", "slug")
    }
    
    curl.exe --connect-timeout 30 --max-time 60 --user "$username`:$password" --upload-file $file.FullName --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/public_html/$remotePath"
    
    # Small delay between uploads
    Start-Sleep -Milliseconds 500
}

Write-Host "Upload complete!"
