import express from 'express';
import CreateTodoItemCommand from '../../../domain/command/CreateTodoItemCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoTitle, description, dueDate, priorityLevel, category, tags } = req.body;

    const result = await CreateTodoItemCommand.execute({
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      category,
      tags,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-todo-item',
  router,
};