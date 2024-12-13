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

# Create WinSCP script
$winscpScript = @"
option batch abort
option confirm off
open ftp://hwd@by1.net:!Maverick007!@server25.shared.spaceship.host -timeout=60 -passive
cd /public_html
put .htaccess
cd /public_html
put -resumesupport=on -filemask=|.git/;|node_modules/;|.next/;|.vscode/;*.tmp out/* 
exit
"@

Set-Content -Path "winscp.txt" -Value $winscpScript -Encoding ASCII
Write-Host "Created WinSCP script"

# Download WinSCP .NET assembly
$url = "https://downloads.sourceforge.net/project/winscp/WinSCP/5.21.5/WinSCP-5.21.5-Portable.zip"
$output = "winscp.zip"

Write-Host "Downloading WinSCP..."
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "Extracting WinSCP..."
Expand-Archive -Path $output -DestinationPath "winscp" -Force

Write-Host "Running WinSCP script..."
& "winscp\WinSCP.com" /script=winscp.txt /log=winscp.log

if ($LASTEXITCODE -eq 0) {
    Write-Host "Upload completed successfully!"
} else {
    Write-Host "Upload failed with error code $LASTEXITCODE"
    Get-Content winscp.log
}

# Cleanup
Remove-Item winscp.txt, winscp.zip, winscp.log -ErrorAction SilentlyContinue
Remove-Item winscp -Recurse -Force -ErrorAction SilentlyContinue
