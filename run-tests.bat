@echo off
REM Quick Setup Script for 3-Role Job Board Testing
REM Run this script to install and test

echo ========================================
echo 3-Role Job Board - Test Setup
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js found
echo.

echo [2/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

echo [3/4] Installing Playwright browsers...
call npx playwright install chromium
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Playwright browsers
    pause
    exit /b 1
)
echo ✅ Playwright browsers installed
echo.

echo [4/4] Running tests...
echo This will take about 2-3 minutes...
echo.
call npx playwright test test-job-board.js --headed
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Some tests failed. Check the output above.
) else (
    echo.
    echo ✅ All tests passed!
)
echo.

echo ========================================
echo Test Complete!
echo ========================================
echo.
echo 📸 Screenshots saved to: test-screenshots\
echo 📄 HTML Report: test-screenshots\test-report.html
echo 📊 Playwright Report: playwright-report\index.html
echo.
echo Open test-report.html in your browser to view results!
echo.

REM Open the test report automatically
if exist "test-screenshots\test-report.html" (
    echo Opening test report...
    start "" "test-screenshots\test-report.html"
)

pause
