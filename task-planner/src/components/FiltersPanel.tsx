import { usePlanner } from "../context/PlannerContext";
import { Category } from "../types/task";

const categories: Category[] = ["To Do", "In Progress", "Review", "Completed"];
const durations = [
  { label: "1 week", value: 7 },
  { label: "2 weeks", value: 14 },
  { label: "3 weeks", value: 21 },
];

export default function FiltersPanel() {
  const { state, dispatch } = usePlanner();

  const toggleCategory = (cat: Category) => {
    const current = state.filters.categories;
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];

    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, categories: updated },
    });
  };

  const setDuration = (days: number | null) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, duration: days },
    });
  };

  const setSearch = (text: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, search: text },
    });
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-2xl border border-gray-200 mb-6 w-full sm:max-w-xs transition-all duration-200 hover:shadow-lg">
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={state.filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      
      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-3">Categories</p>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
          {categories.map((cat) => (
            <label
              key={cat}
              className={`flex items-center gap-2 p-2 rounded-lg border transition cursor-pointer 
                ${
                  state.filters.categories.includes(cat)
                    ? "bg-blue-50 border-blue-400"
                    : "bg-gray-50 border-gray-200 hover:bg-blue-50"
                }`}
            >
              <input
                type="checkbox"
                checked={state.filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-blue-500"
              />
              <span className="text-gray-700 text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <p className="font-semibold text-gray-800 mb-3">Duration</p>
        <div className="flex flex-wrap gap-3 sm:flex-col">
          {durations.map((d) => (
            <label
              key={d.value}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition cursor-pointer 
                ${
                  state.filters.duration === d.value
                    ? "bg-blue-50 border-blue-400"
                    : "bg-gray-50 border-gray-200 hover:bg-blue-50"
                }`}
            >
              <input
                type="radio"
                name="duration"
                checked={state.filters.duration === d.value}
                onChange={() => setDuration(d.value)}
                className="accent-blue-500"
              />
              <span className="text-gray-700 text-sm">{d.label}</span>
            </label>
          ))}
          <label
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition cursor-pointer 
              ${
                state.filters.duration === null
                  ? "bg-blue-50 border-blue-400"
                  : "bg-gray-50 border-gray-200 hover:bg-blue-50"
              }`}
          >
            <input
              type="radio"
              name="duration"
              checked={state.filters.duration === null}
              onChange={() => setDuration(null)}
              className="accent-blue-500"
            />
            <span className="text-gray-700 text-sm">All</span>
          </label>
        </div>
      </div>
    </div>
  );
}
