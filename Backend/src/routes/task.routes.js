import { Router } from 'express';
import { body, param } from 'express-validator';
import * as taskController from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

// Validation Rules
const createRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
];

const idRule = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];

// Routes
router.post('/', createRules, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.patch('/:id', idRule, taskController.updateTaskStatus);
router.delete('/:id', idRule, taskController.deleteTask);

export default router;
