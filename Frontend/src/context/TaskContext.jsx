import { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  getTasks as getTasksApi,
  createTask as createTaskApi,
  toggleComplete as toggleCompleteApi,
  deleteTask as deleteTaskApi,
} from '../api/task.api';

const TaskContext = createContext(null);

const LIMIT = 5;

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilterState] = useState('');
  const [page, setPageState] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const filterRef = useRef('');
  const pageRef = useRef(1);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: pageRef.current, limit: LIMIT };
      if (filterRef.current) params.status = filterRef.current;
      const res = await getTasksApi(params);
      setTasks(res.data.data.tasks);
      setPagination(res.data.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const setFilter = useCallback((newFilter) => {
    filterRef.current = newFilter;
    pageRef.current = 1;
    setFilterState(newFilter);
    setPageState(1);
    fetchTasks();
  }, [fetchTasks]);

  const setPage = useCallback((newPage) => {
    pageRef.current = newPage;
    setPageState(newPage);
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async ({ title, description }) => {
    await createTaskApi({ title, description });
    pageRef.current = 1;
    setPageState(1);
    fetchTasks();
  };

  const markCompleted = async (id) => {
    await toggleCompleteApi(id);
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTaskApi(id);
    if (tasks.length === 1 && pageRef.current > 1) {
      pageRef.current = pageRef.current - 1;
      setPageState(pageRef.current);
    }
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks, loading, error,
        filter, setFilter,
        page, setPage,
        pagination,
        fetchTasks,
        addTask, markCompleted, removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
