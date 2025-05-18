
# Task Manager App

A simple JavaScript-based task manager with filtering, deadline tracking, and local storage persistence.

## Features
- Add new tasks with a name, category, deadline, and status.
- View all tasks dynamically in a list.
- Update task status (In Progress, Completed).
- Automatically mark tasks as "Overdue" based on deadline.
- Filter tasks by category or status.
- Persistent task storage via Local Storage.

## Instructions
1. Open `index.html` in a browser.
2. Add tasks using the input form.
3. Filter or update tasks as needed.
4. Tasks remain saved after refreshing the page.

## Reflection
**Challenges:** The main challenge was handling the dynamic filtering and status updating while keeping the UI in sync with the data. Managing local storage in a clean and structured way was also slightly tricky at first.

**Approach:** I modularized key functionality—adding, displaying, filtering—to make logic clearer. I used local storage early to avoid rewriting logic later.

**Improvements:** With more time, I'd add task deletion, sorting, and edit functionality, and refactor into separate classes or modules for better maintainability.