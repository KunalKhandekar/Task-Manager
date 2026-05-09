import Task, { TASK_STATUS } from "../models/task.model.js";

const createTask = async (userId, { title, description }) => {
  const task = await Task.create({ title, description, userId });
  return task;
};

const getAllTasks = async (userId, { status, page = 1, limit = 10 }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const filter = { userId };
  if (status && Object.values(TASK_STATUS).includes(status)) {
    filter.status = status;
  }

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

const updateTaskStatus = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  if (task.status === TASK_STATUS.COMPLETED) {
    const err = new Error("Task is already completed");
    err.status = 400;
    throw err;
  }

  task.status = TASK_STATUS.COMPLETED;
  await task.save();
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
};

export { createTask, getAllTasks, updateTaskStatus, deleteTask };
