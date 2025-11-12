
## Prerequisites
- Ensure you are in a Git repository with necessary permissions.
- Files such as `whatwedone.md`, `5thingwilldo.md`, and `bigpicture.md` will be created or updated as needed.
- **Critical**: Always review outputs before confirming actions with 'uuuu'.

## 🧠 Codebase Context Management Strategy
This strategy **must** be applied to **ALL** workflows before any summary, commit, or update is generated. It serves as your method for navigating large codebases efficiently.

- **Codebase Intent Analysis**: Analyze the user's workflow trigger (`kkkk`, `gggg`, or `bbbb`) and the associated goal (e.g., "summarize progress," "create commit message," or "document project roles").
- **Mandatory Retrieval**: Execute an internal Workspace Semantic Search (analogous to the `@workspace` command) to identify the top 5-10 files or code blocks most relevant to the current intent.
- **Context Injection**: Incorporate the content of these top relevant code blocks into your processing context before generating any final output.
- **Prioritization**: If your internal index identifies a file as highly relevant, retrieve and include its full content or the specific relevant code block, even if it exceeds typical context window limits.

## 🔄 On "kkkk" Input: Progress Summary and Task Planning
- 🔍 **Context Retrieval**: Perform a Workspace Semantic Search for recent commits and modified files related to the project goals to identify completed work.
- 📋 **Summarize Completed Work**: Generate a clear bullet-point list of all completed work so far and display it in the chat window. (Must use retrieved context).
- 🎯 **Suggest Next Tasks**: Perform another Workspace Semantic Search on project objectives and current file structure to propose the next 5 logical tasks. Display below the summary.
- ✅ **Mark Completed Tasks**: If `5thingwilldo.md` exists, mark any completed tasks with a checkmark emoji (✅) and visually distinguish them in the suggestion list (e.g., "✅ Task name").
- ❓ **Confirmation Prompt**: After displaying summaries and suggestions, ask: "Type 'uuuu' if you want me to update `whatwedone.md` and `5thingwilldo.md` with this progress."
- 💾 **Update Files on 'uuuu'**:
  - Update or create `whatwedone.md` with the summary.
  - Update or create `5thingwilldo.md` with the 5 latest next tasks, preserving checkmarks for completed ones.

## 🚀 On "gggg" Input: Git Commit and Push
- 📤 **Stage Changes**: Execute `git add .` to stage all changes.
- 🔍 **Context Retrieval**: Perform a Workspace Semantic Search on the staged files and immediately surrounding relevant files (e.g., associated test files or configuration files).
- 🤖 **Generate Commit Message**: Analyze the staged changes and the retrieved context to generate a detailed, atomic commit message.
- 👀 **Review Message**: Display the AI-generated commit message in chat for review/confirmation.
- ✅ **Commit Changes**: Run `git commit -m "<AI-generated commit message>"`.
- ⬆️ **Push to Remote**: Execute `git push`.
- 🎉 **Announce Success**: Confirm commit/push success in chat, displaying the commit message.

## 📖 On "bbbb" Input: Project Documentation Update
- 🔍 **Codebase Context Retrieval (Deep Search)**: Perform a targeted Workspace Semantic Search on the entire codebase for all code related to the project's roles, authentication logic, workflow, and features (even if the original source was `3role_job_board.html` which is now fragmented).
- 📝 **Generate Summary**: Create a detailed summary covering:
  - **Project Overview**: What the collective files/project are about, citing the main entry point files.
  - **App Flow**: Major processes and workflows, cross-referencing component names and file paths found in the retrieval step.
  - **Role Details**: For each role (Contractor, Employer, Agent), list specific features, permissions, and management capabilities, citing the specific file and function where the logic resides.
- 👀 **Display Preview**: Show the detailed summary and a preview of proposed `bigpicture.md` changes in chat.
- 🔒 **Preserve Context**: Ensure updates to `bigpicture.md` only add or expand context—never overwrite or reduce prior content.
- ❓ **Confirmation Prompt**: Ask: "Type 'uuuu' to update `bigpicture.md` with these improvements."
- 💾 **Update File on 'uuuu'**: Append or update `bigpicture.md` with the enhanced, full summary (maintain or improve quality and context).

## 📋 General Guidelines
- 🧠 **Large Codebase Protocol**: When generating output or analysis, you must first perform a semantic search of the entire workspace/repository to retrieve relevant context. Never attempt to load the entire project at once. Use the Codebase Context Management Strategy defined above.
- 🔍 **Review Before Action**: Always display summaries, proposals, and commit messages in chat for review before executing file changes or Git operations.
- 🛡️ **Preserve Quality**: Never reduce the quality or remove context from previous content.
- 🎨 **Response Format**: All chat responses must use bullet-point format with emojis for clarity and visual appeal.
- 🔄 **Idempotency**: Ensure operations are safe to repeat without unintended side effects.
- 🚨 **Error Handling**: If any Git operations fail (e.g., commit or push), notify the user immediately and do not proceed. For file updates, avoid duplicates by checking existing content.
- ❓ **Unrecognized Inputs**: If the input is not `kkkk`, `gggg`, or `bbbb`, respond with a helpful message explaining the valid triggers.
