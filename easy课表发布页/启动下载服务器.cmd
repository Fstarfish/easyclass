@echo off
cd /d "%~dp0"
echo ============================================
echo   easy kebiao download server (Ctrl+C stop)
echo   PC: http://127.0.0.1:8899
echo   Phone: open LAN address printed below
echo ============================================
start "" http://127.0.0.1:8899
node server.js