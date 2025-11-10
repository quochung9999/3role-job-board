# 🚀 Quick Start Guide - Playwright Testing

## Fastest Way to Run Tests

### Windows
```bash
# Double-click this file or run in terminal:
run-tests.bat
```

### Linux/Mac
```bash
# Make executable and run:
chmod +x run-tests.sh
./run-tests.sh
```

### Manual Installation
```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install chromium

# 3. Run tests
npm run test:headed
```

## 📊 View Results

After tests complete:
1. Open `test-screenshots/test-report.html` in your browser
2. Browse through 50+ screenshots
3. Click any image to enlarge

## ⚡ Quick Commands

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Debug mode (step through tests)
npm run test:debug

# Interactive UI mode
npm run test:ui

# View Playwright report
npm run report
```

## 📸 What Gets Tested

✅ Complete deal workflow (Contractor → Employer → Agent)  
✅ Chat system with messaging  
✅ Progress tracker with 5 stages  
✅ Agent dashboard, analytics, timeline  
✅ Accept/deny during cooling-off period  
✅ Deal approval, rejection, deletion  
✅ All navigation tabs  
✅ Activity feed  
✅ Form validation  
✅ State management  

## 🎯 Expected Output

```
Running 5 tests...

✓ Complete Deal Workflow - All Features (45s)
✓ Test Deal Rejection Flow (20s)
✓ Test Deal Deletion Flow (15s)
✓ Test Contractor Deny During Cooling-off (20s)
✓ Test All Navigation Tabs (15s)

5 passed (115s)

📸 50+ screenshots generated
📄 HTML report: test-screenshots/test-report.html
```

## 🐛 Troubleshooting

**Error: Cannot find module '@playwright/test'**
```bash
npm install
```

**Error: Executable doesn't exist**
```bash
npx playwright install chromium --force
```

**Tests timeout**
- Close other applications
- Try headless mode: `npm test`

**Screenshots not saving**
- Check folder permissions
- Run as administrator (Windows)

## 💡 Pro Tips

1. **Watch tests run:** Use `npm run test:headed`
2. **Debug failures:** Use `npm run test:debug`
3. **Best visualization:** Open test-report.html after completion
4. **CI/CD ready:** Tests run headless by default

## 📁 File Structure

```
single_html_app/
├── 3role_job_board.html      ← The app
├── test-job-board.js          ← Test suite
├── package.json               ← Dependencies
├── playwright.config.js       ← Config
├── run-tests.bat             ← Windows setup
├── run-tests.sh              ← Linux/Mac setup
└── test-screenshots/         ← Results folder
    ├── 001-initial-load.png
    ├── 002-progress-tracker.png
    ├── ...
    └── test-report.html      ← Main report
```

## ⏱️ Timing

- Setup (first time): ~2 minutes
- Test execution: ~2-3 minutes
- Total: ~5 minutes

## 🎉 Success Indicators

✅ All 5 test suites pass  
✅ 50+ screenshots generated  
✅ test-report.html opens in browser  
✅ Progress reaches 100%  
✅ No error messages in console  

---

**Ready?** Run `run-tests.bat` (Windows) or `./run-tests.sh` (Mac/Linux)
