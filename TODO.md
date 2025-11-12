# TODO List

## Codebase Context Management Strategy
- [ ] Implement Workspace Semantic Search for context retrieval.
- [ ] Integrate retrieved context into all relevant workflows.
- [ ] Prioritize and include highly relevant files/code blocks.

## kkkk: Progress Summary and Task Planning
- [ ] Implement context retrieval for recent commits and modified files.
- [ ] Summarize completed work in a bullet-point list.
- [ ] Suggest next 5 logical tasks based on project objectives and file structure.
- [ ] Mark completed tasks in `5thingwilldo.md` with a checkmark emoji (✅).
- [ ] Prompt user for confirmation to update `whatwedone.md` and `5thingwilldo.md`.
- [ ] Update/create `whatwedone.md` with the summary.
- [ ] Update/create `5thingwilldo.md` with next tasks, preserving checkmarks.

## gggg: Git Commit and Push
- [ ] Stage all changes using `git add .`.
- [ ] Perform Workspace Semantic Search on staged and surrounding files.
- [ ] Generate a detailed, atomic commit message based on changes and context.
- [ ] Display the commit message for review.
- [ ] Commit changes using `git commit -m "<AI-generated commit message>"`.
- [ ] Push to remote using `git push`.
- [ ] Announce success and display the commit message.
- [ ] Handle Git operation failures gracefully.

## bbbb: Project Documentation Update
- [ ] Perform deep Workspace Semantic Search for roles, authentication, workflows, and features.
- [ ] Generate a detailed summary including Project Overview, App Flow, and Role Details.
- [ ] Display the summary and a preview of `bigpicture.md` changes.
- [ ] Ensure updates to `bigpicture.md` only add or expand context.
- [ ] Prompt user for confirmation to update `bigpicture.md`.
- [ ] Append or update `bigpicture.md` with the enhanced summary.

## General Guidelines
- [ ] Ensure all operations are idempotent.
- [ ] Handle errors gracefully and notify the user.
- [ ] Avoid duplicates in file updates.
- [ ] Use bullet-point format with emojis for chat responses.
