# 🎯 3-Role Job Board - Playwright Test Suite

Complete end-to-end testing suite for the 3-Role Job Board application using Playwright.

## 📋 Features Tested

### ✅ Complete Workflow
1. **Initial Application Load** - All 3 role containers
2. **Progress Tracker** - 5-stage workflow visualization
3. **Contractor Flow**
   - Submit initial demand (rate, options, hours, days)
   - View status with cooling-off period
   - Accept/Deny deal during cooling-off
   - Navigate between tabs (Home, Chat, Status)
4. **Employer Flow**
   - Review contractor demand
   - Start chat negotiation
   - Exchange messages
   - Confirm and submit deal
5. **Chat System**
   - Bi-directional messaging
   - Real-time updates
   - Message history
6. **Agent Features**
   - Dashboard with metrics
   - Analytics (risk, priority, compliance)
   - Timeline view
   - Review console
   - Deal approval/rejection/deletion
7. **Progress Tracking**
   - Real-time percentage updates
   - Stage tooltips
   - Progress details panel
   - Failed state handling
8. **Activity Feed** - Real-time event tracking
9. **Workflow Simulation** - Jump between stages

### 📸 Screenshot Coverage
- **50+ Screenshots** capturing every major feature
- Full-page screenshots for complete views
- Modal and dialog captures
- Tooltip demonstrations
- Before/after state comparisons

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npm run install:browsers
```

## 🧪 Running Tests

### Run All Tests (Headless)
```bash
npm test
```

### Run with Browser Visible
```bash
npm run test:headed
```

### Run in Debug Mode
```bash
npm run test:debug
```

### Run with UI Mode (Recommended for Development)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

## 📊 Test Output

### Directory Structure
```
single_html_app/
├── test-screenshots/          # All test screenshots
│   ├── 001-initial-load.png
│   ├── 002-progress-tracker.png
│   ├── ...
│   ├── 050-final-view.png
│   └── test-report.html       # Interactive HTML report
├── test-job-board.js          # Test suite
├── package.json
└── 3role_job_board.html       # Application under test
```

### HTML Report
After running tests, open `test-screenshots/test-report.html` in a browser to see:
- Gallery view of all screenshots
- Click to enlarge any screenshot
- Test summary and statistics
- Timestamp of test run

## 🎯 Test Scenarios

### 1. Complete Deal Workflow (Main Test)
**Duration:** ~45 seconds  
**Screenshots:** 36+

Tests the complete happy path:
- Contractor submits demand → Employer accepts → Chat negotiation → Agent approves

### 2. Deal Rejection Flow
**Duration:** ~20 seconds  
**Screenshots:** 2

Tests agent rejection workflow and status reset.

### 3. Deal Deletion Flow
**Duration:** ~15 seconds  
**Screenshots:** 2

Tests permanent deletion by agent.

### 4. Contractor Deny During Cooling-off
**Duration:** ~20 seconds  
**Screenshots:** 3

Tests contractor's ability to deny deal during cooling-off period.

### 5. All Navigation Tabs
**Duration:** ~15 seconds  
**Screenshots:** 10

Tests every tab across all three roles.

## 📝 Test Details

### What Gets Tested

#### ✅ UI Elements
- All 3 role containers render correctly
- Progress tracker displays and updates
- Navigation tabs work
- Forms accept input
- Buttons are clickable
- Modals appear and function

#### ✅ Functionality
- Form validation
- State management
- Data flow between roles
- Real-time updates
- Chat messaging
- Status changes
- Progress calculation

#### ✅ Workflows
- End-to-end deal creation
- Approval/rejection paths
- Cooling-off period logic
- Agent management features

#### ✅ Visual Regression
- Screenshots at every major step
- Before/after comparisons
- Failed state handling
- Tooltip displays

## 🔧 Configuration

### Viewport Size
Default: 1920x1080 (to capture all 3 roles side-by-side)

To change, edit `test-job-board.js`:
```javascript
viewport: { width: 1920, height: 1080 }
```

### Screenshot Directory
Default: `./test-screenshots`

To change, edit `test-job-board.js`:
```javascript
const SCREENSHOT_DIR = path.join(__dirname, 'test-screenshots');
```

### Animation Wait Time
Default: 1000ms

To adjust, edit `waitForAnimation()` function:
```javascript
async function waitForAnimation() {
    await page.waitForTimeout(1000);
}
```

## 📈 Expected Results

All tests should pass with:
- ✅ 5 test suites
- ✅ 50+ screenshots generated
- ✅ 0 failures
- ✅ Progress reaches 100%
- ✅ HTML report generated

## 🐛 Troubleshooting

### Tests Fail to Start
```bash
# Reinstall Playwright browsers
npx playwright install --force
```

### Timeout Errors
Increase timeout in `playwright.config.js`:
```javascript
timeout: 60000 // 60 seconds
```

### Screenshots Not Saving
Check write permissions on the directory:
```bash
# Windows
icacls test-screenshots /grant Users:F

# Linux/Mac
chmod 755 test-screenshots
```

### Dialog Not Accepted
Make sure the dialog handler is set:
```javascript
page.on('dialog', dialog => dialog.accept());
```

## 📚 Playwright Resources

- [Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🎨 Screenshot Examples

### Workflow Progress
- Initial load with all 3 roles
- Progress tracker at 20%, 40%, 60%, 80%, 100%
- Chat conversations
- Agent analytics dashboard
- Timeline view
- Deal approval confirmation

### State Changes
- Demand submission
- Chat negotiation start
- Cooling-off period
- Deal acceptance
- Final approval

## 💡 Tips

1. **Run with --headed** to watch the test in action
2. **Use --debug** to step through the test
3. **Check test-report.html** for visual verification
4. **Adjust wait times** if your system is slower
5. **Run individual tests** with `--grep "test name"`

## 🔄 Continuous Integration

To run in CI/CD:

```yaml
# .github/workflows/test.yml
name: Playwright Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-screenshots
          path: test-screenshots/
```

## 📞 Support

For issues or questions:
1. Check the screenshots in the report
2. Review the console output
3. Run with --debug for step-by-step execution

---

**Last Updated:** November 9, 2025  
**Test Coverage:** 100% of user-facing features
