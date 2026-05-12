import mongoose from 'mongoose';

export const TASK_STATUS = Object.freeze({
  PENDING: 'pending',
  COMPLETED: 'completed',
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.PENDING,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
