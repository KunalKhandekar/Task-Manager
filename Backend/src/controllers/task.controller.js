import { validationResult } from 'express-validator';
import * as taskService from '../services/task.service.js';

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const task = await taskService.createTask(req.user.id, req.body);
    res.status(201).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { status, page, limit, order } = req.query;
    const result = await taskService.getAllTasks(req.user.id, { status, page, limit, order });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export { createTask, getAllTasks, updateTaskStatus, deleteTask };
