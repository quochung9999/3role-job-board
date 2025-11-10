#!/bin/bash
# Quick Setup Script for 3-Role Job Board Testing (Linux/Mac)
# Run this script to install and test

echo "========================================"
echo "3-Role Job Board - Test Setup"
echo "========================================"
echo ""

echo "[1/4] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"
echo ""

echo "[2/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

echo "[3/4] Installing Playwright browsers..."
npx playwright install chromium
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Playwright browsers"
    exit 1
fi
echo "✅ Playwright browsers installed"
echo ""

echo "[4/4] Running tests..."
echo "This will take about 2-3 minutes..."
echo ""
npx playwright test test-job-board.js --headed
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Some tests failed. Check the output above."
else
    echo ""
    echo "✅ All tests passed!"
fi
echo ""

echo "========================================"
echo "Test Complete!"
echo "========================================"
echo ""
echo "📸 Screenshots saved to: test-screenshots/"
echo "📄 HTML Report: test-screenshots/test-report.html"
echo "📊 Playwright Report: playwright-report/index.html"
echo ""
echo "Open test-report.html in your browser to view results!"
echo ""

# Try to open the report
if [ -f "test-screenshots/test-report.html" ]; then
    echo "Opening test report..."
    if command -v xdg-open &> /dev/null; then
        xdg-open "test-screenshots/test-report.html"
    elif command -v open &> /dev/null; then
        open "test-screenshots/test-report.html"
    fi
fi
