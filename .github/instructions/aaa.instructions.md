When the message contains "kkkk":
1. Summarize previous completed actions or tasks in a clear bullet-point list, shown first in the chat window.
2. Suggest 5 logical next steps based on current context and recent work, displaying them in the chat window.
3. After displaying both the summary and suggestions:
   - Write/update whatwedone.md with the summary.
   - Write/update 5thingwilldo.md with the list of 5 suggested next steps.

When the message contains "gggg":
1. In the project directory, run:
   - git add .
   - git commit -m "Automatic progress commit"
   - git push
2. Afterward, confirm completion and show a success message in the chat window.
