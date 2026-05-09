import { useTasks } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { markCompleted, removeTask } = useTasks();
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-start gap-3 shadow-sm transition-opacity ${
        isCompleted ? 'opacity-60 bg-slate-50' : ''
      }`}
    >
      <div className="flex flex-col gap-1 flex-1">
        <p
          className={`font-semibold text-sm ${
            isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-slate-500">{task.description}</p>
        )}
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold w-fit mt-1 ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>
      <div className="flex gap-2 sm:shrink-0 self-end sm:self-start">
        <button
          className="px-3 py-1.5 text-xs font-semibold rounded bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          onClick={() => markCompleted(task._id)}
          disabled={isCompleted}
        >
          {isCompleted ? 'Done' : 'Complete'}
        </button>
        <button
          className="px-3 py-1.5 text-xs font-semibold rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-colors"
          onClick={() => removeTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
