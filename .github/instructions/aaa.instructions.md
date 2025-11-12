When the chat or command input contains "kkkk":  
1. Summarize all completed work so far in a clear bullet-point list and display this summary prominently in the chat window.  
2. Suggest 5 logical next steps or tasks to move forward, showing them in the chat window directly below the summary.  
3. From the previous "5thingwilldo.md" file, identify any tasks that are now completed and mark each with a checkmark emoji (✅), visually distinguishing them in the suggestion list (for example, "✅ Task name").  
4. After fully showing the summary and suggested next steps, prompt me with:  
   "If you want me to update the files with this progress, type 'uuuu'."  
5. When I reply with "uuuu":  
   - Update or create the file "whatwedone.md" to reflect the completed work summary.  
   - Update or create the file "5thingwilldo.md" with the new list of 5 next tasks, including the checkmark emoji for completed tasks.

When the chat or command input contains "gggg":  
1. Run `git add .` to stage all changes.  
2. Use GitHub Copilot to generate a commit message based on the staged code changes, capturing the actual progress reflected in those changes.  
3. Display this AI-generated commit message in the chat window for optional review or automatic confirmation.  
4. Run `git commit -m "<AI-generated commit message>"` to commit the staged changes.  
5. Run `git push` to push the changes to the remote repository.  
6. Confirm in the chat window that the commit and push succeeded, showing the commit message used.

Please ensure all summary, suggestions, and commit messages are fully displayed in the chat window for my review before updating files or running Git commands.
