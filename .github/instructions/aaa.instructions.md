# GitHub Copilot Chat: Custom Interactive Workflow

## On "kkkk" input:
1. Summarize all completed work so far in a clear bullet list; display this summary in the chat window.
2. Suggest the next 5 logical tasks; display these below the summary.
3. If a previous "5thingwilldo.md" exists, mark any completed task(s) with a checkmark emoji (✅) and visually distinguish in the suggestion list ("✅ Task name").
4. After showing all summaries and suggestions, ask:
   "Type 'uuuu' if you want me to update whatwedone.md and 5thingwilldo.md with this progress."
5. When 'uuuu' is typed:
   - Update or create "whatwedone.md" with the summary.
   - Update or create "5thingwilldo.md" with the 5 latest next tasks, keeping checkmarks for completed ones.

## On "gggg" input:
1. Run `git add .` to stage all changes.
2. Use Copilot to analyze staged changes and generate a detailed commit message based on progress.
3. Show the AI-generated commit message for review/confirmation.
4. Run `git commit -m "<AI-generated commit message>"`
5. Run `git push`
6. Announce commit/push success in chat, displaying the commit message.

## On "bbbb" input:
1. Read "3role_job_board.html" (break into parts if large).
2. Summarize in detail:
   - What the file/project is about.
   - App flow/major processes.
   - For each role: list specific features, permissions, and what each role can manage.
3. Display the detailed summary and a preview of the proposed "bigpicture.md" changes in chat.
4. Ensure updates to "bigpicture.md" only add or expand context—never overwrite or reduce prior content.
5. Ask:
   "Type 'uuuu' to update bigpicture.md with these improvements."
6. When 'uuuu' is typed:
   - Update/append "bigpicture.md" with the enhanced, full summary (maintain or improve quality and context).

## General
- Always show summaries, proposals, and commit messages in chat for review before making any file changes or Git commits.
- Never reduce the quality or remove the context of previous content.
- For large files, process and summarize in segments, then integrate.
- All response on chat window must have bullet points format and emojis where applicable for clarity.
