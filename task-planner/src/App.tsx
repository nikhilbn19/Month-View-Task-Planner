import React from "react";
import { PlannerProvider, usePlanner } from "./context/PlannerContext";

function DebugTasks() {
  const { state, dispatch } = usePlanner();

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "ADD_TASK",
            payload: {
              id: Date.now().toString(),
              name: "Test Task",
              category: "To Do",
              start: "2025-08-01",
              end: "2025-08-03",
            },
          })
        }
      >
        Add Task
      </button>
      <pre>{JSON.stringify(state.tasks, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <PlannerProvider>
      <DebugTasks />
    </PlannerProvider>
  );
}
