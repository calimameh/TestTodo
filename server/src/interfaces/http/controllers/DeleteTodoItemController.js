import express from 'express';
import DeleteTodoItemCommand from '../../../domain/command/DeleteTodoItemCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID, deletionReason } = req.body;

    if (!todoID || !deletionReason) {
      return res.status(400).json({ message: 'Both todoID and deletionReason are required.' });
    }

    await DeleteTodoItemCommand.execute({ todoID, deletionReason });
    res.status(200).json({});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-todo-item',
  router,
};