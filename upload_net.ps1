# Create .htaccess file
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

function Upload-File {
    param (
        [string]$localPath,
        [string]$remotePath
    )
    
    try {
        $ftpUrl = "ftp://server25.shared.spaceship.host/public_html/$remotePath"
        $webclient = New-Object System.Net.WebClient
        $webclient.Credentials = New-Object System.Net.NetworkCredential("hwd@by1.net", "!Maverick007!")
        
        Write-Host "Uploading $localPath to $remotePath..."
        $webclient.UploadFile($ftpUrl, $localPath)
        Write-Host "Successfully uploaded $localPath"
        return $true
    }
    catch {
        Write-Host "Error uploading $localPath`: $_"
        return $false
    }
    finally {
        if ($webclient) {
            $webclient.Dispose()
        }
    }
}

# Upload .htaccess first
$success = Upload-File -localPath ".htaccess" -remotePath ".htaccess"
if (-not $success) {
    Write-Host "Failed to upload .htaccess file"
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
    
    $success = Upload-File -localPath $file.FullName -remotePath $remotePath
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
    Write-Host "`nFailed to upload the following files:"
    $failedFiles | ForEach-Object { Write-Host "- $_" }
    exit 1
} else {
    Write-Host "`nAll files uploaded successfully!"
    exit 0
}
