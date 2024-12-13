$ftpUrl = "ftp://server25.shared.spaceship.host"
$user = "hwd@by1.net"
$pass = "!Maverick007!"

# Create a webclient object
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)

# Function to upload a file
function Upload-FTPFile {
    param($sourceFile, $targetFile)
    try {
        Write-Host "Uploading $sourceFile to $targetFile"
        $uri = New-Object System.Uri("$ftpUrl$targetFile")
        $webclient.UploadFile($uri, $sourceFile)
        Write-Host "Successfully uploaded $sourceFile"
    }
    catch {
        Write-Host "Error uploading $sourceFile : $_"
    }
}

# Upload all files from the out directory
$sourceDir = "g:/Websites/BY1/BY1 Claude+bolt 2nd draft/project/out"
Get-ChildItem -Path $sourceDir -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($sourceDir.Length)
    $targetPath = "/public_html$($relativePath.Replace('\', '/'))"
    Upload-FTPFile $_.FullName $targetPath
}

Write-Host "Upload complete"
