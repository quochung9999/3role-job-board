# Big Picture: The 3-Role Job Board Application

## 1. Application Purpose

This project is a sophisticated, single-page web application designed to simulate a complete hiring workflow between three distinct user roles: a **Contractor**, an **Employer**, and a facilitating **Agent**. It serves as a proof-of-concept for building complex, stateful, multi-user web applications using vanilla JavaScript, with a modern UI powered by Tailwind CSS.

The entire application—structure (HTML), styling (CSS), and logic (JavaScript)—is encapsulated within a single `3role_job_board.html` file. It uses the browser's `localStorage` for session persistence and state management, and integrates with a **Supabase** backend for database operations, including storing deal information, user data, chat messages, and system logs.

A key feature is the robust error logging and monitoring system, which includes an interactive **Error Dashboard** for developers to track, filter, and analyze frontend exceptions in real-time.

## 2. Overall Application Flow

The application follows a structured, linear workflow that guides the three parties from initial demand to final contract approval.

1.  **Login & Role Simulation**: The user starts by selecting one of nine pre-configured dummy users from a dropdown menu, instantly simulating the experience of a Contractor, Employer, or Agent.

2.  **Contractor Submits Demand**: The workflow is initiated by the **Contractor**, who submits their initial terms, including their desired hourly rate, service model, and work schedule.

3.  **Employer Review & Negotiation**: The **Employer** is notified of the Contractor's demand. They review the terms and can choose to enter a **Chat Negotiation** phase.

4.  **Chat Negotiation**: A real-time, Slack-style chat interface opens for both the Contractor and Employer. Here, they can discuss terms, clarify details, and come to a mutual agreement. The chat history is saved as a critical part of the deal's record.

5.  **Employer Confirms Deal**: Once the negotiation is complete, the **Employer** formally confirms the agreed-upon terms and submits the deal to the **Agent** for final review and approval.

6.  **Agent Review & Decision**: The **Agent** receives the complete deal package in a dedicated "Review Console." This includes the final terms, the full chat history, and analytics. The Agent has the ultimate authority to either **Approve** or **Reject** the deal.

7.  **Workflow Conclusion**:
    *   **On Approval**: The deal status is updated to "Processed," and the hiring process is considered complete.
    *   **On Rejection**: The deal is terminated. The workflow resets, and the Contractor must submit a new demand to begin again.

## 3. Role-Specific Features & Interactions

Each role has a unique user interface and set of capabilities tailored to their function in the workflow.

### 👤 Contractor (The Job Seeker)

*   **Primary Goal**: To submit a work proposal and get it approved.
*   **Key Screens & Actions**:
    *   **Dashboard**: The starting point where the Contractor fills out and submits their initial demand (rate, work hours, etc.).
    *   **Status**: A read-only screen that provides a clear, real-time view of the deal's current stage in the workflow.
    *   **Chat**: The negotiation interface for discussing terms directly with the Employer.
    *   **Cancel Deal**: The ability to withdraw their proposal during specific phases of the process.

### 🏢 Employer (The Hiring Manager)

*   **Primary Goal**: To review talent, negotiate terms, and submit a finalized contract for approval.
*   **Key Screens & Actions**:
    *   **Talent Search**: A view to discover available contractors. The primary interaction is with "Alex R." to initiate the deal flow.
    *   **Contractor View**: The main dashboard for a specific deal, showing the contractor's demand and the current deal status.
    *   **Start Chat Negotiation**: The primary action to move the deal forward after reviewing the initial demand.
    *   **Confirm Deal**: The final step for the Employer, where they submit the negotiated terms to the Agent.
    *   **Active Deals**: A view to manage and see the status of multiple ongoing deals.

### 🎯 Agent (The Deal Manager & Facilitator)

*   **Primary Goal**: To oversee, analyze, and provide final approval for deals.
*   **Key Screens & Actions**:
    *   **Dashboard**: A high-level overview of the current deal's metrics, including its financial value, total activities, and recent agent actions.
    *   **Review Console**: The most critical screen for the Agent. It displays the final deal terms, the complete chat history between the other two parties, and allows the Agent to add private notes before making a decision.
    *   **Approve/Reject/Delete**: The core actions the Agent can take to finalize, cancel, or permanently remove a deal.
    *   **Analytics**: A detailed view with financial analysis (monthly/annual value), risk/priority assessment tools, and compliance checklists.
    *   **Timeline**: A chronological log of every single event and state change that has occurred during the deal's lifecycle.

---

## 4. Expanded Project Overview & Technical Details

- 🎯 **3-Role Job Board Application**: Single-page web app for managing hiring deals between Contractor, Employer, and Agent roles.
- 🏗️ **Main Entry Point**: `3role_job_board.html` — contains all HTML, CSS, and JavaScript logic. Supabase backend for database, authentication, and real-time updates. State managed via browser `localStorage`.
- 🧪 **Testing**: Automated Playwright test suite (`test-job-board.js`, `TEST_README.md`, `TEST_SUITE_OVERVIEW.md`). 50+ tests, 100% coverage, visual regression via screenshots.

## 5. Application Workflow

- 🛠️ **Standard Deal Workflow (5 Steps)**:
  1. Contractor submits demand
  2. Employer reviews and negotiates
  3. Chat negotiation
  4. Employer confirms
  5. Agent reviews, approves/rejects
  - Final state: "Deal Manager Processed - Ready for Escrow"
- 🔀 **Alternative Flows**:
  - Agent rejection/deletion
  - Contractor cancellation during cooling-off
  - Navigation across 10 tabs
- 🗂️ **Database Schema**:
  - 5 tables: users, deals, messages, activities, agent_actions
  - Row Level Security (RLS) and role-based access control
  - Realtime subscriptions and audit trail

## 6. Role Details (with File References)

### 👤 Contractor (Job Seeker)
- Features:
  - Submit job demand (rate, options, hours, days)
  - View and track deal status
  - Accept/deny deal during cooling-off
  - Chat with employer
- Permissions:
  - Can initiate deals, negotiate, and accept/deny offers
- Management:
  - UI: `#contractor-app` in `3role_job_board.html`
  - Logic: Demand submission, status updates, chat integration

### 🏢 Employer (Hiring Manager)
- Features:
  - Review contractor demands
  - Start chat negotiation
  - Confirm and submit deals
- Permissions:
  - Can review, negotiate, and finalize deals
- Management:
  - UI: `#employer-app` in `3role_job_board.html`
  - Logic: Review/confirm workflow, chat, deal management

### 🎯 Agent (Deal Manager & Facilitator)
- Features:
  - Dashboard with metrics
  - Analytics (risk, priority, compliance)
  - Timeline view, review console
  - Approve/reject/delete deals
- Permissions:
  - Can monitor, approve/reject, and permanently delete deals
- Management:
  - UI: `#agent-app` in `3role_job_board.html`
  - Logic: Approval workflow, analytics, audit trail

## 7. File References
- Main app: `3role_job_board.html`
- Tests: `test-job-board.js`, `TEST_README.md`, `TEST_SUITE_OVERVIEW.md`
- Database: `supabase-schema.sql`, `supabase/config.toml`, migrations
- Documentation: `README.md`, `bigpicture.md`, `SCREENSHOT_MAP.md`

---

✅ Documentation expanded and context preserved. Latest update: November 12, 2025.
