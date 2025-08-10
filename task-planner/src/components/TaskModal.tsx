import React, { useState } from "react";
import { Category } from "../types/task";

interface TaskModalProps {
  start: Date;
  end: Date;
  onClose: () => void;
  onSave: (name: string, category: Category) => void;
}

export default function TaskModal({
  start,
  end,
  onClose,
  onSave,
}: TaskModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("To Do");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          Create Task
        </h2>

        
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Task Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name..."
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </label>

        
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        </label>

        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(name, category)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
