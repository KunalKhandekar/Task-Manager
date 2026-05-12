import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function AddTaskForm({ onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!title.trim()) {
    //   setError('Title is required');
    //   return;
    // }
    // if (!description.trim()) {
    //   setError('description is required');
    //   return;
    // }
    setError('');
    setSubmitting(true);
    try {
      await addTask({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      onClose?.();
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(
        errors?.length
          ? errors.map((e) => e.msg).join(", ")
          : err.response?.data?.message || "Failed to add task"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-slate-800 transition-colors';

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <input
        className={inputCls}
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className={`${inputCls} resize-y min-h-18`}
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="flex gap-2 justify-end pt-1">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer transition-colors"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Adding…' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
