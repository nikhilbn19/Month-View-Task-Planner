// src/types/task.ts
export type Category = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
  id: string;           
  name: string;
  category: Category;
  start: string;        
  end: string;          
}

export interface Filters {
  categories: Category[]; 
  duration: number | null; 
  search: string;          
}

export interface PlannerState {
  tasks: Task[];
  filters: Filters;
}
