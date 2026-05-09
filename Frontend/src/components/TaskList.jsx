import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export default function TaskList() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    page,
    setPage,
    pagination,
  } = useTasks();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const isActive = filter === f.value;

          return (
            <button
              key={f.value}
              onClick={() => !isActive && setFilter(f.value)}
              disabled={isActive}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white cursor-not-allowed opacity-80"
                  : "bg-white border border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer"
              }`}
            >
              {f.label}
            </button>
          );
        })}
        {pagination.total > 0 && (
          <span className="ml-auto self-center text-xs text-slate-400">
            {pagination.total} task{pagination.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-6 text-sm">
          Loading tasks…
        </p>
      ) : error ? (
        <p className="text-center text-red-500 py-6 text-sm">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-slate-400 py-6 text-sm">
          {filter ? `No ${filter} tasks.` : "No tasks yet. Add one above!"}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1 || loading}
            className="px-4 py-1.5 text-sm font-semibold rounded-md border border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= pagination.totalPages || loading}
            className="px-4 py-1.5 text-sm font-semibold rounded-md border border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
