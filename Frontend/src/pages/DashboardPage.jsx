import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

export default function DashboardPage() {
  const { fetchTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-slate-800">Your Tasks</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Task
        </button>
      </div>

      <TaskList />

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 sm:px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-800">Add New Task</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <AddTaskForm onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
