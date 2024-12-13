$ftpUrl = "ftp://server25.shared.spaceship.host"
$username = "hwd@by1.net"
$password = "!Maverick007!"
$maxRetries = 3
$retryDelay = 5

function Upload-FileWithRetry {
    param (
        [string]$localPath,
        [string]$remotePath
    )
    
    $attempt = 1
    $success = $false
    
    while (-not $success -and $attempt -le $maxRetries) {
        Write-Host "Attempt $attempt of $maxRetries`: Uploading $localPath to $remotePath"
        try {
            $result = curl.exe --connect-timeout 60 --max-time 120 --retry 3 --retry-delay 2 --user "$username`:$password" --upload-file $localPath --ftp-create-dirs --ssl-no-revoke --ftp-pasv "$ftpUrl/public_html/$remotePath" 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Successfully uploaded $localPath"
                $success = $true
            } else {
                Write-Host "Failed to upload $localPath (Attempt $attempt)"
                Write-Host "Error: $result"
                if ($attempt -lt $maxRetries) {
                    Write-Host "Waiting $retryDelay seconds before retry..."
                    Start-Sleep -Seconds $retryDelay
                }
            }
        } catch {
            Write-Host "Error uploading $localPath (Attempt $attempt): $_"
            if ($attempt -lt $maxRetries) {
                Write-Host "Waiting $retryDelay seconds before retry..."
                Start-Sleep -Seconds $retryDelay
            }
        }
        $attempt++
    }
    
    return $success
}

# Create and upload .htaccess
$htaccessContent = @"
DirectoryIndex index.html
RewriteEngine On
RewriteBase /

# Handle Next.js static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /404.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css text/javascript application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access 1 year"
    ExpiresByType image/jpeg "access 1 year"
    ExpiresByType image/gif "access 1 year"
    ExpiresByType image/png "access 1 year"
    ExpiresByType text/css "access 1 month"
    ExpiresByType application/javascript "access 1 month"
    ExpiresByType text/javascript "access 1 month"
    ExpiresByType application/x-javascript "access 1 month"
    ExpiresByType text/html "access 1 month"
    ExpiresByType application/xhtml+xml "access 1 month"
</IfModule>

# Prevent directory listings
Options -Indexes

# Additional security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
"@

Set-Content -Path ".htaccess" -Value $htaccessContent
Write-Host "Created .htaccess file"

$success = Upload-FileWithRetry -localPath ".htaccess" -remotePath ".htaccess"
if (-not $success) {
    Write-Host "Failed to upload .htaccess after $maxRetries attempts"
    exit 1
}

# Upload all files from the out directory
$outPath = "out"
$files = Get-ChildItem -Path $outPath -Recurse -File

$totalFiles = $files.Count
$currentFile = 0
$successCount = 0
$failedFiles = @()

foreach ($file in $files) {
    $currentFile++
    $relativePath = $file.FullName.Substring((Resolve-Path $outPath).Path.Length + 1)
    $remotePath = $relativePath.Replace("\", "/")
    
    Write-Host "[$currentFile/$totalFiles] Processing $relativePath"
    
    # Handle special case for [slug] directory
    if ($remotePath -match "\[slug\]") {
        $remotePath = $remotePath.Replace("[slug]", "slug")
    }
    
    $success = Upload-FileWithRetry -localPath $file.FullName -remotePath $remotePath
    if ($success) {
        $successCount++
    } else {
        $failedFiles += $relativePath
    }
    
    # Add a small delay between files to prevent overwhelming the server
    Start-Sleep -Milliseconds 500
}

Write-Host "`nUpload Summary:"
Write-Host "Successfully uploaded: $successCount/$totalFiles files"

if ($failedFiles.Count -gt 0) {
    Write-Host "`nFailed to upload the following files after $maxRetries attempts:"
    $failedFiles | ForEach-Object { Write-Host "- $_" }
    exit 1
} else {
    Write-Host "`nAll files uploaded successfully!"
    exit 0
}
