import axiosInstance from './axiosInstance';

export const getTasks = (params = {}) =>
  axiosInstance.get('/tasks', { params });

export const createTask = (data) =>
  axiosInstance.post('/tasks', data);

export const toggleComplete = (id) =>
  axiosInstance.patch(`/tasks/${id}`);

export const deleteTask = (id) =>
  axiosInstance.delete(`/tasks/${id}`);
