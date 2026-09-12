@echo off
chcp 65001 >nul
setlocal

set /p commit_message=Commit message: 

if "%commit_message%"=="" (
  echo Commit message is required.
  exit /b 1
)

git add -A
git commit -m "%commit_message%"

if errorlevel 1 exit /b 1

git push -u origin main
endlocal
