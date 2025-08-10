import React, { useState } from "react";
import { getMonthDays } from "../utils/dateUtils";
import {
  format,
  isSameMonth,
  isToday,
  parseISO,
  isWithinInterval,
  differenceInCalendarDays,
} from "date-fns";
import { usePlanner } from "../context/PlannerContext";
import { Task } from "../types/task";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import TaskModal from "./TaskModal";


function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `task-${task.id}`,
      data: { type: "move", task },
    });

  const { attributes: leftAttrs, listeners: leftListeners, setNodeRef: setLeftRef } =
    useDraggable({ id: `resize-start-${task.id}`, data: { type: "resize-start", task } });

  const { attributes: rightAttrs, listeners: rightListeners, setNodeRef: setRightRef } =
    useDraggable({ id: `resize-end-${task.id}`, data: { type: "resize-end", task } });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const categoryColors: Record<string, string> = {
    "To Do": "bg-gray-500 text-white",
    "In Progress": "bg-blue-500 text-white",
    "Review": "bg-yellow-400 text-black",
    "Done": "bg-green-500 text-white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative px-2 py-1 rounded-lg text-xs sm:text-sm font-medium flex items-center cursor-grab shadow-md hover:shadow-lg transition-all ${categoryColors[task.category] || "bg-gray-400 text-white"}`}
    >
      
      <div
        ref={setLeftRef}
        {...leftListeners}
        {...leftAttrs}
        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 cursor-w-resize rounded-l"
      />
      <span className="flex-1 truncate text-center">{task.name}</span>
      
      <div
        ref={setRightRef}
        {...rightListeners}
        {...rightAttrs}
        className="absolute right-0 top-0 bottom-0 w-1 bg-blue-700 cursor-e-resize rounded-r"
      />
    </div>
  );
}


function DroppableDay({ day, children }: { day: Date; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: day.toISOString(),
    data: { date: day },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-28 sm:h-32 border border-gray-200 p-1 flex flex-col transition-all duration-150 ${
        isOver ? "bg-blue-50 ring-2 ring-blue-400" : "bg-white"
      }`}
    >
      {children}
    </div>
  );
}

interface CalendarProps {
  currentMonth: Date;
}

export default function Calendar({ currentMonth }: CalendarProps) {
  const days = getMonthDays(currentMonth);
  const { state, dispatch } = usePlanner();

  const filteredTasks = state.tasks.filter((task: Task) => {
    const { categories, duration, search } = state.filters;
    if (categories.length && !categories.includes(task.category)) return false;

    if (duration) {
      const today = new Date();
      const diff = differenceInCalendarDays(parseISO(task.end), today);
      if (diff > duration) return false;
    }

    if (search && !task.name.toLowerCase().includes(search.toLowerCase()))
      return false;

    return true;
  });

  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [modalData, setModalData] = useState<{ start: Date; end: Date } | null>(null);

  const openCreateTaskModal = (start: Date, end: Date) => {
    setModalData({ start, end });
  };

  const handleMouseDown = (day: Date) => {
    setSelectionStart(day);
    setSelectionEnd(day);
  };

  const handleMouseEnter = (day: Date) => {
    if (selectionStart) {
      setSelectionEnd(day);
    }
  };

  const handleMouseUp = () => {
    if (selectionStart && selectionEnd) {
      const start = selectionStart < selectionEnd ? selectionStart : selectionEnd;
      const end = selectionEnd > selectionStart ? selectionEnd : selectionStart;
      openCreateTaskModal(start, end);
    }
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  return (
    <>
      
      <div className="grid grid-cols-7 border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base shadow-lg">
        {days.map((day, idx) => {
          const inCurrentMonth = isSameMonth(day, currentMonth);

          const dayTasks = filteredTasks.filter((task: Task) => {
            const start = parseISO(task.start);
            const end = parseISO(task.end);
            return isWithinInterval(day, { start, end });
          });

          const isSelected =
            selectionStart &&
            selectionEnd &&
            isWithinInterval(day, {
              start: selectionStart < selectionEnd ? selectionStart : selectionEnd,
              end: selectionEnd > selectionStart ? selectionEnd : selectionStart,
            });

          return (
            <DroppableDay key={idx} day={day}>
              <div
                onMouseDown={() => handleMouseDown(day)}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseUp={handleMouseUp}
                className={`flex-1 p-1 sm:p-2 rounded-md transition-all duration-150 ${
                  isSelected ? "bg-blue-100 ring-1 ring-blue-300" : ""
                }`}
              >
                <span
                  className={`inline-block mb-1 font-semibold text-xs sm:text-sm ${
                    !inCurrentMonth ? "text-gray-400" : ""
                  } ${
                    isToday(day)
                      ? "bg-blue-500 text-white rounded-full px-2 py-0.5 shadow-sm"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </span>

                <div className="flex flex-col gap-1 overflow-hidden">
                  {dayTasks.map((task) => (
                    <DraggableTask key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </DroppableDay>
          );
        })}
      </div>

      {modalData && (
        <TaskModal
          start={modalData.start}
          end={modalData.end}
          onClose={() => setModalData(null)}
          onSave={(name, category) => {
            dispatch({
              type: "ADD_TASK",
              payload: {
                id: crypto.randomUUID(),
                name,
                category,
                start: modalData.start.toISOString().split("T")[0],
                end: modalData.end.toISOString().split("T")[0],
              },
            });
            setModalData(null);
          }}
        />
      )}
    </>
  );
}
