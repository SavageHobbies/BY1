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

# Download FileZilla CLI
$url = "https://download.filezilla-project.org/client/FileZilla_3.65.0_win64.zip"
$output = "filezilla.zip"

Write-Host "Downloading FileZilla..."
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "Extracting FileZilla..."
Expand-Archive -Path $output -DestinationPath "filezilla" -Force

# Create FileZilla script
$fzScript = @"
open ftp://hwd@by1.net:!Maverick007!@server25.shared.spaceship.host
cd /public_html
put .htaccess
cd /public_html
put -r out/* .
exit
"@

Set-Content -Path "fz_script.txt" -Value $fzScript -Encoding ASCII
Write-Host "Created FileZilla script"

Write-Host "Running FileZilla script..."
& "filezilla\FileZilla\filezilla.exe" -s fz_script.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "Upload completed successfully!"
} else {
    Write-Host "Upload failed with error code $LASTEXITCODE"
}

# Cleanup
Remove-Item filezilla.zip, fz_script.txt -ErrorAction SilentlyContinue
Remove-Item filezilla -Recurse -Force -ErrorAction SilentlyContinue
