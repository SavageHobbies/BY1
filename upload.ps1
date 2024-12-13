$ftpUrl = "ftp://server25.shared.spaceship.host/"
$username = "hwd@by1.net"
$password = "!Maverick007!"

# Function to upload a file using curl
function Upload-File {
    param(
        [string]$sourcePath,
        [string]$targetPath
    )
    
    try {
        $targetUrl = $ftpUrl + $targetPath
        Write-Host "Uploading $sourcePath to $targetUrl"
        
        # Use curl to upload the file
        $curlArgs = @(
            "--user", "$($username):$($password)",
            "--upload-file", $sourcePath,
            "--ftp-create-dirs",
            "--ssl-no-revoke",
            "--ftp-pasv",
            $targetUrl
        )
        
        & curl.exe @curlArgs
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully uploaded $sourcePath"
        } else {
            Write-Host "Failed to upload $sourcePath with exit code $LASTEXITCODE"
        }
    } catch {
        Write-Host "Error uploading $sourcePath : $_"
    }
}

# Get all files from the out directory recursively
$sourceDir = "g:/Websites/BY1/BY1 Claude+bolt 2nd draft/project/out"
$files = Get-ChildItem -Path $sourceDir -Recurse -File

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($sourceDir.Length + 1).Replace("\", "/")
    $targetPath = "public_html/" + $relativePath
    Upload-File -sourcePath $file.FullName -targetPath $targetPath
}
