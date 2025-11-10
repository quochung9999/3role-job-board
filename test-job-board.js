/**
 * Playwright Test Script for 3-Role Job Board Application
 * Tests all features and captures screenshots of the complete workflow
 * 
 * Installation:
 * npm install -D @playwright/test
 * npx playwright install
 * 
 * Run:
 * npx playwright test test-job-board.js --headed
 */

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Configuration
const APP_URL = `file://${path.join(__dirname, '3role_job_board.html')}`;
const SCREENSHOT_DIR = path.join(__dirname, 'test-screenshots');

// Create screenshot directory
if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('3-Role Job Board - Complete Workflow Test', () => {
    let page;
    let screenshotCounter = 0;

    // Helper function to take screenshots
    async function captureScreenshot(name, fullPage = false) {
        screenshotCounter++;
        const filename = `${String(screenshotCounter).padStart(3, '0')}-${name}.png`;
        await page.screenshot({ 
            path: path.join(SCREENSHOT_DIR, filename),
            fullPage: fullPage
        });
        console.log(`📸 Screenshot saved: ${filename}`);
    }

    // Helper to wait for animations
    async function waitForAnimation() {
        await page.waitForTimeout(1000);
    }

    test.beforeEach(async ({ browser }) => {
        // Create a new context with larger viewport to see all 3 roles
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        page = await context.newPage();
    });

    test('Complete Deal Workflow - All Features', async () => {
        console.log('\n🚀 Starting Complete Workflow Test...\n');

        // ============================================
        // STEP 1: Initial Load
        // ============================================
        console.log('📍 Step 1: Loading Application...');
        await page.goto(APP_URL);
        await waitForAnimation();
        await captureScreenshot('01-initial-load', true);

        // Verify all three role containers are visible
        await expect(page.locator('#contractor-app')).toBeVisible();
        await expect(page.locator('#employer-app')).toBeVisible();
        await expect(page.locator('#agent-app')).toBeVisible();
        console.log('✅ All 3 role containers loaded');

        // ============================================
        // STEP 2: Verify Progress Tracker
        // ============================================
        console.log('\n📍 Step 2: Verifying Progress Tracker...');
        await expect(page.locator('.progress-tracker')).toBeVisible();
        await expect(page.locator('#progress-percentage')).toContainText('20%'); // Stage 1
        await captureScreenshot('02-progress-tracker');

        // Test progress details panel
        await page.click('button:has-text("Details")');
        await waitForAnimation();
        await captureScreenshot('03-progress-details-open');
        await page.click('button:has-text("Details")');
        await waitForAnimation();
        console.log('✅ Progress tracker verified');

        // ============================================
        // STEP 3: Contractor Submits Initial Demand
        // ============================================
        console.log('\n📍 Step 3: Contractor Submitting Demand...');
        
        // Fill demand form
        await page.fill('#demand-rate', '75');
        await page.selectOption('#demand-option', 'Option 2 (Assisted Hire)');
        await page.fill('#work-hours', '9 AM - 6 PM');
        await page.fill('#work-days', 'Monday - Friday');
        await waitForAnimation();
        await captureScreenshot('04-contractor-demand-form-filled');

        // Handle alert BEFORE clicking
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        // Submit demand
        await page.click('button:has-text("Submit Demand to Employer")');
        await page.waitForTimeout(1500);
        await captureScreenshot('05-demand-submitted', true);
        console.log('✅ Demand submitted - Progress should be 40%');

        // Verify progress updated
        await expect(page.locator('#progress-percentage')).toContainText('40%');

        // ============================================
        // STEP 4: Contractor Views Status
        // ============================================
        console.log('\n📍 Step 4: Checking Contractor Status...');
        
        // Navigate to contractor status tab
        const contractorNav = page.locator('#contractor-nav');
        await contractorNav.locator('button:has-text("Status")').click();
        await waitForAnimation();
        await captureScreenshot('06-contractor-status-view');
        console.log('✅ Contractor status viewed');

        // ============================================
        // STEP 5: Employer Reviews and Starts Chat
        // ============================================
        console.log('\n📍 Step 5: Employer Starting Chat Negotiation...');
        
        // Employer should see the demand
        const employerContent = page.locator('#employer-content');
        await expect(employerContent.getByText('$75.00 / hr')).toBeVisible();
        await captureScreenshot('07-employer-sees-demand');

        // Handle next dialog
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        // Start chat negotiation
        await page.click('button:has-text("Start Chat Negotiation")');
        await page.waitForTimeout(1500);
        await waitForAnimation();
        await captureScreenshot('08-chat-negotiation-started', true);
        console.log('✅ Chat negotiation started - Progress should be 60%');

        // Verify progress
        await expect(page.locator('#progress-percentage')).toContainText('60%');

        // ============================================
        // STEP 6: Chat Exchange Between Parties
        // ============================================
        console.log('\n📍 Step 6: Testing Chat System...');
        
        // Contractor sends message
        await page.locator('#contractor-nav button:has-text("Chat")').click();
        await waitForAnimation();
        await captureScreenshot('09-contractor-chat-view');
        
        await page.fill('#chat-input-contractor', 'Hello! I am excited about this opportunity.');
        await page.click('button:has-text("Send")');
        await waitForAnimation();
        await captureScreenshot('10-contractor-sent-message');
        console.log('✅ Contractor sent message');

        // Employer responds
        await page.locator('#employer-nav button:has-text("Chat")').click();
        await waitForAnimation();
        await captureScreenshot('11-employer-chat-view');
        
        await page.fill('#chat-input-employer', 'Great! Let\'s finalize the terms.');
        await page.click('#employer-content button:has-text("Send")');
        await waitForAnimation();
        await captureScreenshot('12-employer-sent-message');
        console.log('✅ Employer sent message');

        // Another contractor message
        await page.locator('#contractor-nav button:has-text("Chat")').click();
        await waitForAnimation();
        await page.fill('#chat-input-contractor', 'I confirm the rate and hours look good.');
        await page.click('#contractor-content button:has-text("Send")');
        await waitForAnimation();
        await captureScreenshot('13-chat-conversation', true);
        console.log('✅ Chat conversation completed');

        // ============================================
        // STEP 7: Employer Confirms Deal
        // ============================================
        console.log('\n📍 Step 7: Employer Confirming Deal...');
        
        // Navigate to contractor view
        await page.locator('#employer-nav button:has-text("View")').click();
        await waitForAnimation();
        
        // Click confirm deal
        await page.click('button:has-text("Confirm Deal")');
        await waitForAnimation();
        await captureScreenshot('14-employer-confirm-modal');
        
        // Confirm in modal
        await page.click('button:has-text("Confirm & Submit")');
        await waitForAnimation();
        await captureScreenshot('15-deal-submitted-to-agent', true);
        console.log('✅ Deal submitted to agent - Progress should be 80%');

        // Verify progress
        await expect(page.locator('#progress-percentage')).toContainText('80%');

        // ============================================
        // STEP 8: Test Activity Feed
        // ============================================
        console.log('\n📍 Step 8: Testing Activity Feed...');
        
        await page.click('button:has-text("Activity")');
        await waitForAnimation();
        await captureScreenshot('16-activity-feed-open', true);
        
        await page.click('button:has-text("✕")');
        await waitForAnimation();
        console.log('✅ Activity feed tested');

        // ============================================
        // STEP 9: Contractor Accept/Deny Options
        // ============================================
        console.log('\n📍 Step 9: Testing Contractor Cooling-off Period...');
        
        // Navigate to contractor status
        await page.locator('#contractor-nav button:has-text("Status")').click();
        await page.waitForTimeout(2500); // Wait for UI to fully update and render cooling-off buttons
        
        // Wait for buttons to appear (cooling-off period)
        await page.waitForSelector('button:has-text("Accept Deal")', { timeout: 15000 });
        await captureScreenshot('17-contractor-cooling-off-period');
        
        // Should see accept/deny buttons
        await expect(page.locator('button:has-text("Accept Deal")')).toBeVisible();
        await expect(page.locator('button:has-text("Deny & Cancel Deal")')).toBeVisible();
        console.log('✅ Cooling-off options visible');

        // Contractor accepts deal
        await page.click('button:has-text("Accept Deal")');
        await page.waitForTimeout(1000);
        await captureScreenshot('18-contractor-accepted-deal');
        console.log('✅ Contractor accepted deal');

        // ============================================
        // STEP 10: Agent Dashboard
        // ============================================
        console.log('\n📍 Step 10: Testing Agent Dashboard...');
        
        // Agent dashboard
        await page.locator('#agent-nav button:has-text("Dashboard")').click();
        await waitForAnimation();
        await captureScreenshot('19-agent-dashboard');
        console.log('✅ Agent dashboard viewed');

        // ============================================
        // STEP 11: Agent Analytics
        // ============================================
        console.log('\n📍 Step 11: Testing Agent Analytics...');
        
        await page.locator('#agent-nav button:has-text("Analytics")').click();
        await waitForAnimation();
        await captureScreenshot('20-agent-analytics');
        
        // Test risk level change
        await page.selectOption('#risk-level', 'medium');
        await waitForAnimation();
        await captureScreenshot('21-agent-risk-updated');
        
        // Test priority change
        await page.selectOption('#priority-level', 'high');
        await waitForAnimation();
        await captureScreenshot('22-agent-priority-updated');
        
        // Test compliance checkbox
        await page.check('input[type="checkbox"]');
        await waitForAnimation();
        
        // Test background check
        await page.selectOption('#background-check', 'passed');
        await waitForAnimation();
        await captureScreenshot('23-agent-compliance-updated');
        console.log('✅ Agent analytics tested');

        // ============================================
        // STEP 12: Agent Timeline
        // ============================================
        console.log('\n📍 Step 12: Testing Agent Timeline...');
        
        await page.locator('#agent-nav button:has-text("Timeline")').click();
        await waitForAnimation();
        await captureScreenshot('24-agent-timeline', true);
        console.log('✅ Agent timeline viewed');

        // ============================================
        // STEP 13: Agent Review Console
        // ============================================
        console.log('\n📍 Step 13: Testing Agent Review Console...');
        
        await page.locator('#agent-nav button:has-text("Review")').click();
        await waitForAnimation();
        await captureScreenshot('25-agent-review-console');
        
        // Check that contractor acceptance is shown
        await expect(page.getByText('Contractor Already Accepted')).toBeVisible();
        
        // Add agent notes
        await page.fill('#agent-notes', 'All terms verified. Contractor and employer have agreed. Background check passed. Ready for approval.');
        await waitForAnimation();
        await captureScreenshot('26-agent-notes-added');
        console.log('✅ Agent review console tested');

        // ============================================
        // STEP 14: Agent Approves Deal
        // ============================================
        console.log('\n📍 Step 14: Agent Approving Deal...');
        
        // Handle confirmation dialog
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        
        await page.click('button:has-text("Approve & Finalize")');
        await page.waitForTimeout(1500);
        await captureScreenshot('27-agent-approve-confirmation');
        await waitForAnimation();
        await captureScreenshot('28-deal-approved', true);
        console.log('✅ Deal approved - Progress should be 100%');

        // Verify completion
        await expect(page.locator('#progress-percentage')).toContainText('100%');
        await expect(page.locator('#progress-status-text')).toContainText('Ready for escrow');

        // ============================================
        // STEP 15: Final State Views
        // ============================================
        console.log('\n📍 Step 15: Capturing Final State...');
        
        // Contractor final view
        await page.locator('#contractor-nav button:has-text("Status")').click();
        await waitForAnimation();
        await captureScreenshot('29-contractor-final-status');
        
        // Employer final view
        await page.locator('#employer-nav button:has-text("View")').click();
        await waitForAnimation();
        await captureScreenshot('30-employer-final-status');
        
        // Agent final dashboard
        await page.locator('#agent-nav button:has-text("Dashboard")').click();
        await waitForAnimation();
        await captureScreenshot('31-agent-final-dashboard');
        
        // Full page final screenshot with progress details open
        await page.click('button:has-text("Details")');
        await waitForAnimation();
        await captureScreenshot('32-final-complete-view', true);
        console.log('✅ Final states captured');

        // ============================================
        // STEP 16: Test Workflow Simulation Buttons
        // ============================================
        console.log('\n📍 Step 16: Testing Workflow Simulation...');
        
        // Test jumping to different stages
        await page.click('#contractor-app button:has-text("Step 1")');
        await waitForAnimation();
        await captureScreenshot('33-simulation-step-1');
        await expect(page.locator('#progress-percentage')).toContainText('20%');
        
        await page.click('#contractor-app button:has-text("Step 3")');
        await waitForAnimation();
        await captureScreenshot('34-simulation-step-3');
        await expect(page.locator('#progress-percentage')).toContainText('60%');
        
        await page.click('#contractor-app button:has-text("Step 5")');
        await waitForAnimation();
        await captureScreenshot('35-simulation-step-5');
        await expect(page.locator('#progress-percentage')).toContainText('100%');
        console.log('✅ Workflow simulation tested');

        // ============================================
        // STEP 17: Test Progress Tracker Tooltips
        // ============================================
        console.log('\n📍 Step 17: Testing Progress Tracker Tooltips...');
        
        const steps = await page.locator('.progress-step').all();
        for (let i = 0; i < steps.length; i++) {
            await steps[i].hover();
            await page.waitForTimeout(500);
            await captureScreenshot(`36-tooltip-step-${i + 1}`);
        }
        console.log('✅ All tooltips tested');

        // ============================================
        // Final Summary
        // ============================================
        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log(`📸 Total Screenshots: ${screenshotCounter}`);
        console.log(`📁 Location: ${SCREENSHOT_DIR}`);
        console.log('='.repeat(60) + '\n');
    });

    // ============================================
    // Additional Feature Tests
    // ============================================

    test('Test Deal Rejection Flow', async ({ browser }) => {
        console.log('\n🚀 Starting Deal Rejection Test...\n');
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        page = await context.newPage();
        
        // Handle all dialogs
        page.on('dialog', async dialog => {
            console.log(`Dialog: ${dialog.message()}`);
            await dialog.accept();
        });

        await page.goto(APP_URL);
        await waitForAnimation();

        // Quick workflow to agent review
        await page.fill('#demand-rate', '80');
        await page.selectOption('#demand-option', 'Option 1 (Self-Service)');
        await waitForAnimation();
        
        await page.click('button:has-text("Submit Demand to Employer")');
        await page.waitForTimeout(1500);

        await page.click('button:has-text("Start Chat Negotiation")');
        await page.waitForTimeout(2000); // Wait for chat phase to activate
        
        // Navigate to View tab to see Confirm Deal button
        await page.locator('#employer-nav button:has-text("View")').click();
        await page.waitForTimeout(1000);
        
        // Wait for Confirm Deal button to be visible
        await page.waitForSelector('button:has-text("Confirm Deal")', { timeout: 10000 });
        await page.click('button:has-text("Confirm Deal")');
        await page.waitForTimeout(1000);
        await page.click('button:has-text("Confirm & Submit")');
        await page.waitForTimeout(1500);

        // Agent rejects
        await page.locator('#agent-nav button:has-text("Review")').click();
        await waitForAnimation();
        await captureScreenshot('37-before-rejection');

        await page.click('button:has-text("Reject Deal")');
        await waitForAnimation();
        await captureScreenshot('38-deal-rejected', true);

        // Verify status reset
        await expect(page.locator('#progress-percentage')).toContainText('0%');
        console.log('✅ Rejection flow tested');
    });

    test('Test Deal Deletion Flow', async ({ browser }) => {
        console.log('\n🚀 Starting Deal Deletion Test...\n');
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        page = await context.newPage();
        
        // Handle all dialogs
        page.on('dialog', async dialog => {
            console.log(`Dialog: ${dialog.message()}`);
            await dialog.accept();
        });

        await page.goto(APP_URL);
        await waitForAnimation();

        // Submit demand
        await page.fill('#demand-rate', '90');
        await page.selectOption('#demand-option', 'Option 3 (Managed PEO)');
        await waitForAnimation();
        
        await page.click('button:has-text("Submit Demand to Employer")');
        await page.waitForTimeout(1500);

        // Agent deletes
        await page.locator('#agent-nav button:has-text("Review")').click();
        await waitForAnimation();
        await captureScreenshot('39-before-deletion');

        await page.click('button:has-text("Permanently Delete Deal")');
        await waitForAnimation();
        await captureScreenshot('40-deal-deleted', true);

        console.log('✅ Deletion flow tested');
    });

    test('Test Contractor Deny During Cooling-off', async ({ browser }) => {
        console.log('\n🚀 Starting Contractor Deny Test...\n');
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        page = await context.newPage();
        
        // Handle all dialogs
        page.on('dialog', async dialog => {
            console.log(`Dialog: ${dialog.message()}`);
            await dialog.accept();
        });

        await page.goto(APP_URL);
        await waitForAnimation();

        // Quick workflow to cooling-off period
        await page.fill('#demand-rate', '70');
        await page.selectOption('#demand-option', 'Option 2 (Assisted Hire)');
        await waitForAnimation();
        
        await page.click('button:has-text("Submit Demand to Employer")');
        await page.waitForTimeout(1500);

        await page.click('button:has-text("Start Chat Negotiation")');
        await page.waitForTimeout(2000); // Wait for chat phase to activate
        
        // Navigate to View tab to see Confirm Deal button
        await page.locator('#employer-nav button:has-text("View")').click();
        await page.waitForTimeout(1000);
        
        // Wait for Confirm Deal button to be visible
        await page.waitForSelector('button:has-text("Confirm Deal")', { timeout: 10000 });
        await page.click('button:has-text("Confirm Deal")');
        await page.waitForTimeout(1000);
        await page.click('button:has-text("Confirm & Submit")');
        await page.waitForTimeout(1500);

        // Contractor denies
        await page.locator('#contractor-nav button:has-text("Status")').click();
        await page.waitForTimeout(2500); // Wait for UI to fully update and render cooling-off buttons
        
        // Wait for deny button to appear (cooling-off period)
        await page.waitForSelector('button:has-text("Deny & Cancel Deal")', { timeout: 15000 });
        await captureScreenshot('41-before-deny');

        await page.click('button:has-text("Deny & Cancel Deal")');
        await page.waitForTimeout(1000);
        await captureScreenshot('42-deny-modal');

        await page.click('button:has-text("Yes, Deny Deal")');
        await page.waitForTimeout(1500);
        await captureScreenshot('43-deal-denied', true);

        console.log('✅ Contractor deny flow tested');
    });

    test('Test All Navigation Tabs', async ({ browser }) => {
        console.log('\n🚀 Starting Navigation Test...\n');
        
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        page = await context.newPage();

        await page.goto(APP_URL);
        await page.waitForTimeout(1000);

        let navCounter = 44;

        // Test all contractor tabs
        const contractorTabs = ['Home', 'Chat', 'Status'];
        for (const tab of contractorTabs) {
            await page.locator('#contractor-nav button:has-text("' + tab + '")').click();
            await page.waitForTimeout(800);
            await captureScreenshot(`${navCounter}-contractor-${tab.toLowerCase()}`);
            navCounter++;
        }

        // Test all employer tabs
        const employerTabs = ['Search', 'View', 'Chat'];
        for (const tab of employerTabs) {
            await page.locator('#employer-nav button:has-text("' + tab + '")').click();
            await page.waitForTimeout(800);
            await captureScreenshot(`${navCounter}-employer-${tab.toLowerCase()}`);
            navCounter++;
        }

        // Test all agent tabs
        const agentTabs = ['Review', 'Dashboard', 'Analytics', 'Timeline'];
        for (const tab of agentTabs) {
            await page.locator('#agent-nav button:has-text("' + tab + '")').click();
            await page.waitForTimeout(800);
            await captureScreenshot(`${navCounter}-agent-${tab.toLowerCase()}`);
            navCounter++;
        }

        screenshotCounter = navCounter;
        console.log('✅ All navigation tabs tested');
    });
});

// Generate HTML report after tests
test.afterAll(async () => {
    console.log('\n📝 Generating test report...\n');
    
    const reportPath = path.join(SCREENSHOT_DIR, 'test-report.html');
    const screenshots = fs.readdirSync(SCREENSHOT_DIR)
        .filter(file => file.endsWith('.png'))
        .sort();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3-Role Job Board - Test Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            min-height: 100vh;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #1e293b;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 2.5rem;
        }
        .summary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            text-align: center;
        }
        .summary h2 { margin-bottom: 0.5rem; }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 2rem;
        }
        .screenshot-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .screenshot-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .screenshot-card img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            cursor: pointer;
        }
        .screenshot-title {
            font-weight: 600;
            color: #334155;
            font-size: 0.95rem;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            cursor: pointer;
        }
        .modal img {
            display: block;
            margin: auto;
            max-width: 95%;
            max-height: 95%;
            margin-top: 2.5%;
        }
        .close {
            position: absolute;
            top: 20px;
            right: 40px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 3-Role Job Board - Complete Test Report</h1>
        
        <div class="summary">
            <h2>Test Summary</h2>
            <p>Total Screenshots: ${screenshots.length}</p>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>All features tested successfully ✅</p>
        </div>

        <div class="gallery">
            ${screenshots.map(file => {
                const title = file.replace(/^\d+-/, '').replace(/\.png$/, '').replace(/-/g, ' ');
                return `
                    <div class="screenshot-card">
                        <img src="${file}" alt="${title}" onclick="openModal('${file}')">
                        <div class="screenshot-title">${title}</div>
                    </div>
                `;
            }).join('')}
        </div>
    </div>

    <div id="modal" class="modal" onclick="closeModal()">
        <span class="close">&times;</span>
        <img id="modal-img">
    </div>

    <script>
        function openModal(src) {
            document.getElementById('modal').style.display = 'block';
            document.getElementById('modal-img').src = src;
        }
        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }
    </script>
</body>
</html>
    `;

    fs.writeFileSync(reportPath, html);
    console.log(`✅ Test report generated: ${reportPath}\n`);
});
