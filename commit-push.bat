@echo off
chcp 65001 >nul
setlocal

set /p commit_message=Commit message: 

if "%commit_message%"=="" (
  echo Commit message is required.
  exit /b 1
)

git add -A -f
git diff --cached --quiet

if errorlevel 1 (
  git commit -m "%commit_message%"
  if errorlevel 1 exit /b 1
)

git fetch origin main
if errorlevel 1 exit /b 1

git rebase origin/main
if errorlevel 1 exit /b 1

git push -u origin main
endlocal
