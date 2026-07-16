Set-Location "C:\IJATBILLING"

git add -A

git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    $waktu = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto sync IjatBilling $waktu"
    git push origin main
}
