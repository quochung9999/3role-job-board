When the chat or command input contains "kkkk":  
1. Summarize all completed work so far in a clear bullet-point list. Display this summary in the chat window.  
2. Suggest 5 logical next steps or tasks to move forward, displaying them in the chat window below the summary.  
3. After the summary and next steps are fully shown to me in this chat, update or create the file "whatwedone.md" with the completed work summary, and update or create the file "5thingwilldo.md" with the 5 suggested next tasks.

When the chat or command input contains "gggg":  
1. Run `git add .` to stage all changes.  
2. Invoke GitHub Copilot to generate a commit message based on the current staged changes, capturing the actual progress and updates made.  
3. Display that AI-generated commit message in the chat window for review or automatic confirmation.  
4. Run `git commit -m "<AI-generated commit message>"` to commit the staged changes.  
5. Run `git push` to push changes to the remote repository.  
6. Confirm in the chat window that the commit and push succeeded and show the AI-generated commit message used.

Please ensure that each time before updating the files or committing, the corresponding outputs are fully visible in the chat window for review.

