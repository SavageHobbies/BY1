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

Set-Content -Path ".htaccess" -Value $htaccessContent -Encoding ASCII
Write-Host "Created .htaccess file"

# Create FTP script for .htaccess
$ftpHtaccessScript = @"
open server25.shared.spaceship.host
hwd@by1.net
!Maverick007!
cd public_html
binary
put .htaccess
quit
"@

Set-Content -Path "upload_htaccess.txt" -Value $ftpHtaccessScript -Encoding ASCII
Write-Host "Created FTP script for .htaccess"

# Upload .htaccess
Write-Host "Uploading .htaccess..."
ftp -s:upload_htaccess.txt -v

# Create directory structure first
$directories = Get-ChildItem -Path "out" -Directory -Recurse | ForEach-Object { $_.FullName.Substring((Resolve-Path "out").Path.Length + 1).Replace("\", "/") }
foreach ($dir in $directories) {
    $ftpMkdirScript = @"
open server25.shared.spaceship.host
hwd@by1.net
!Maverick007!
cd public_html
mkdir $dir
quit
"@
    Set-Content -Path "mkdir.txt" -Value $ftpMkdirScript -Encoding ASCII
    Write-Host "Creating directory: $dir"
    ftp -s:mkdir.txt -v
}

# Upload files directory by directory
$directories = @("") + $directories  # Add root directory
foreach ($dir in $directories) {
    $localPath = if ($dir -eq "") { "out" } else { "out\$($dir.Replace('/', '\'))" }
    $files = Get-ChildItem -Path $localPath -File
    
    if ($files.Count -gt 0) {
        $ftpScript = @"
open server25.shared.spaceship.host
hwd@by1.net
!Maverick007!
cd public_html
"@
        if ($dir -ne "") {
            $ftpScript += "cd $dir`n"
        }
        $ftpScript += @"
binary
"@
        foreach ($file in $files) {
            $ftpScript += "put `"$($file.FullName)`" $($file.Name)`n"
        }
        $ftpScript += "quit"
        
        $scriptPath = "upload_$($dir.Replace('/', '_')).txt"
        Set-Content -Path $scriptPath -Value $ftpScript -Encoding ASCII
        Write-Host "Uploading files in directory: $dir"
        ftp -s:$scriptPath -v
    }
}

# Cleanup
Remove-Item upload_htaccess.txt, mkdir.txt, upload_*.txt -ErrorAction SilentlyContinue

Write-Host "Upload process completed!"
