import React, { createContext, useReducer, useContext } from "react";
import { PlannerState, Task, Filters } from "../types/task";


const initialState: PlannerState = {
  tasks: [],
  filters: {
    categories: [],
    duration: null,
    search: "",
  },
};


type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK_DATES"; payload: { id: string; start: string; end: string } }
  | { type: "SET_FILTERS"; payload: Partial<Filters> };

// 🎯 Reducer Function
function plannerReducer(state: PlannerState, action: Action): PlannerState {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK_DATES":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    default:
      return state;
  }
}


const PlannerContext = createContext<{
  state: PlannerState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});


export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  return (
    <PlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerContext.Provider>
  );
};


export function usePlanner() {
  return useContext(PlannerContext);
}
