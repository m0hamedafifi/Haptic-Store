
  @echo off
:: Check for Administrator permissions
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit
)

:: Get the local IP address using ipconfig and extract the first non-loopback IP
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "127.0.0.1"') do set local_ip=%%A

:: Trim leading spaces from IP address
set local_ip=%local_ip:~1%

:: Backup the hosts file
copy C:\Windows\System32\drivers\etc\hosts C:\Windows\System32\drivers\etc\hosts.bak

:: Append the IP and hostname mapping to the hosts file
echo. >> C:\Windows\System32\drivers\etc\hosts
echo %local_ip%  haptic >> C:\Windows\System32\drivers\etc\hosts

echo Hosts file updated with: %local_ip% haptic

:: Auto-close the command prompt after completion
exit

  