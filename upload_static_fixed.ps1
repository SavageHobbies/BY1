$ftpUrl = "ftp://server25.shared.spaceship.host"
$username = "hwd@by1.net"
$password = "!Maverick007!"

# Function to upload a file
function Upload-File {
    param (
        [string]$localPath,
        [string]$remotePath
    )
    
    Write-Host "Uploading $localPath to $remotePath"
    # Remove any leading slashes from remote path
    $remotePath = $remotePath.TrimStart('/')
    
    try {
        curl.exe --user "$username`:$password" --upload-file "$localPath" --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/$remotePath"
        Write-Host "Successfully uploaded $localPath"
    }
    catch {
        Write-Host "Failed to upload $localPath : $_"
    }
}

# Create and upload .htaccess
$htaccessContent = @"
DirectoryIndex index.html index.php
RewriteEngine On
RewriteBase /

# Handle Next.js static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /404.html [L]

# Prevent directory listings
Options -Indexes

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 day"
</IfModule>
"@

Set-Content -Path ".htaccess" -Value $htaccessContent
Upload-File ".htaccess" "public_html/.htaccess"

# Upload all files from the out directory to the root of public_html
$outPath = "out"
Get-ChildItem -Path $outPath -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring((Resolve-Path $outPath).Path.Length + 1)
    $remotePath = "public_html/$($relativePath.Replace('\', '/'))"
    Upload-File $_.FullName $remotePath
}

Write-Host "Upload complete!"
