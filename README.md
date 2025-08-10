# 📅 Month View Task Planner

A **Month View Task Planner** inspired by Google Calendar — allowing users to create, reschedule, and manage tasks visually through drag-and-drop interactions.  
Built using **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features

- **Month View Calendar** with labeled days
- **Drag-to-Create Tasks** — select multiple consecutive days to schedule a task
- **Reschedule by Drag & Drop** — move tasks between days
- **Stretch to Resize** — adjust task start/end dates from edges
- **Task Categories** — To Do, In Progress, Review, Completed
- **Filtering Panel**:
  - Filter by category (multi-select)
  - Filter by time (1, 2, or 3 weeks)
  - Search tasks live by name
- **Responsive Design** for desktop and mobile
- **State Management** with React Context API
- **Optional**: LocalStorage persistence, month navigation, tooltips, today’s highlight

---

## 🛠️ Tech Stack

- **React (TypeScript)**
- **Tailwind CSS**
- **React Context API**
- **@dnd-kit/core** or `react-dnd` (for drag-and-drop)
- **date-fns** (for date handling)
- **PostCSS**

---

task-planner/
├── src/
│ ├── components/ # UI components
│ ├── context/ # PlannerContext.tsx for global state
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ ├── index.tsx
│ ├── logo.svg
│ ├── react-app-env.d.ts
│ ├── reportWebVitals.ts
│ ├── setupTests.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
## 📂 Folder Structure


<img width="445" height="867" alt="Screenshot 2025-08-10 110448" src="https://github.com/user-attachments/assets/97505b6f-ac95-46cd-9160-75c8d8e565b1" />


---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nikhilbn19/Month-View-Task-Planner.git
cd task-planner

```

Install Dependencies

- npm install

Run the App

- npm start

Build for Production

- npm run build

Usage
Add a Task

- Click and drag over consecutive days to select the duration

- Fill out the modal with the task name and category

- Task will appear as a colored bar across days

- Edit a Task

- Drag and drop the task to a different day

- Stretch from edges to adjust dates

- Use modal to change category

- Filter & Search

- Apply category and time filters

- Search tasks instantly by name

Screenshots
<img width="1897" height="907" alt="Screenshot 2025-08-10 115041" src="https://github.com/user-attachments/assets/a99de6eb-0341-4fa7-a156-b2ad9cca2187" />
<img width="1900" height="907" alt="Screenshot 2025-08-10 115418" src="https://github.com/user-attachments/assets/777b0ed8-a0fa-4d70-8721-ae8d93833cdf" />



