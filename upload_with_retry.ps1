$ftpUrl = "ftp://server25.shared.spaceship.host"
$username = "hwd@by1.net"
$password = "!Maverick007!"

# Function to upload a file with retries
function Upload-File-With-Retry {
    param (
        [string]$localPath,
        [string]$remotePath,
        [int]$maxRetries = 3,
        [int]$retryDelay = 5
    )
    
    $remotePath = $remotePath.TrimStart('/')
    $attempt = 0
    
    do {
        $attempt++
        Write-Host "Attempt $attempt of $maxRetries: Uploading $localPath to $remotePath"
        
        try {
            $result = curl.exe --connect-timeout 30 --max-time 60 --user "$username`:$password" --upload-file "$localPath" --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/$remotePath"
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Successfully uploaded $localPath"
                return $true
            }
        }
        catch {
            Write-Host "Error uploading $localPath : $_"
        }
        
        if ($attempt -lt $maxRetries) {
            Write-Host "Upload failed. Retrying in $retryDelay seconds..."
            Start-Sleep -Seconds $retryDelay
        }
    } while ($attempt -lt $maxRetries)
    
    Write-Host "Failed to upload $localPath after $maxRetries attempts"
    return $false
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
Upload-File-With-Retry ".htaccess" "public_html/.htaccess"

# Upload all files from the out directory to the root of public_html
$outPath = "out"
$files = Get-ChildItem -Path $outPath -Recurse -File

$totalFiles = $files.Count
$currentFile = 0

foreach ($file in $files) {
    $currentFile++
    $relativePath = $file.FullName.Substring((Resolve-Path $outPath).Path.Length + 1)
    $remotePath = "public_html/$($relativePath.Replace('\', '/'))"
    
    Write-Host "[$currentFile of $totalFiles] Processing $relativePath"
    
    # Handle special case for [slug] directory
    if ($remotePath -match "\[slug\]") {
        $remotePath = $remotePath.Replace("[slug]", "slug")
    }
    
    Upload-File-With-Retry $file.FullName $remotePath
    
    # Small delay between uploads to prevent overwhelming the server
    Start-Sleep -Milliseconds 500
}

Write-Host "Upload complete!"
