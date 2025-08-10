import React, { useState } from "react";
import Calendar from "./components/Calendar";
import FiltersPanel from "./components/FiltersPanel";
import { PlannerProvider, usePlanner } from "./context/PlannerContext";
import { Task } from "./types/task";
import {
  addDays,
  differenceInCalendarDays,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { DndContext } from "@dnd-kit/core";

function DebugTasks() {
  const { state, dispatch } = usePlanner();

  return (
    <div className="mt-6">
      {/* <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
      </button> */}
      {/* <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
        {JSON.stringify(state.tasks, null, 2)}
      </pre> */}
    </div>
  );
}

function MainApp() {
  const { state, dispatch } = usePlanner();
  const [currentMonth] = useState(new Date());
  const [search, setSearch] = useState("");

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const filteredTasks = state.tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateTask = (date: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: `Task ${state.tasks.length + 1}`,
      category: "To Do",
      start: date.toISOString().slice(0, 10),
      end: date.toISOString().slice(0, 10),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const data = active.data.current;
    if (!data?.task) return;

    const task: Task = data.task;
    const dropDate: Date = over.data.current.date;

    if (data.type === "move") {
      const duration = differenceInCalendarDays(
        parseISO(task.end),
        parseISO(task.start)
      );
      const newEnd = addDays(dropDate, duration);
      dispatch({
        type: "UPDATE_TASK_DATES",
        payload: {
          id: task.id!,
          start: dropDate.toISOString().split("T")[0],
          end: newEnd.toISOString().split("T")[0],
        },
      });
    }

    if (data.type === "resize-start") {
      if (dropDate < parseISO(task.end)) {
        dispatch({
          type: "UPDATE_TASK_DATES",
          payload: {
            id: task.id!,
            start: dropDate.toISOString().split("T")[0],
            end: task.end,
          },
        });
      }
    }

    if (data.type === "resize-end") {
      if (dropDate > parseISO(task.start)) {
        dispatch({
          type: "UPDATE_TASK_DATES",
          payload: {
            id: task.id!,
            start: task.start,
            end: dropDate.toISOString().split("T")[0],
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          📅 Month View Task Planner
        </h1>
      </header>

      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <FiltersPanel />
      </div>

      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2 sm:p-4 overflow-x-auto">
        <DndContext onDragEnd={handleDragEnd}>
          <Calendar currentMonth={currentMonth} />
        </DndContext>
      </div>

      
      <div className="mt-6 flex justify-end">
        <DebugTasks />
      </div>
    </div>
  );
}


export default function App() {
  return (
    <PlannerProvider>
      <MainApp />
    </PlannerProvider>
  );
}
