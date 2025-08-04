import express from 'express';
import CompleteTodoItemCommand from '../../../domain/command/CompleteTodoItemCommand.js';
import TodoItemNotFoundException from '../../../domain/error/TodoItemNotFoundException.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID, completionDate, completionNotes } = req.body;

    if (!todoID || !completionDate || !completionNotes) {
      return res.status(400).json({ message: 'Missing required fields: todoID, completionDate, completionNotes' });
    }

    const result = await CompleteTodoItemCommand.execute({
      todoID,
      completionDate,
      completionNotes,
    });
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof TodoItemNotFoundException) {
      return res.status(400).json({ message: err.message });
    }
    res.status(400).json({ message: 'An unexpected error occurred.' });
  }
});

export default {
  routeBase: '/complete-todo-item',
  router,
};