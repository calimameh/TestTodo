import express from 'express';
import UpdateTodoItemCommand from '../../../domain/command/UpdateTodoItemCommand.js';
import TodoItemRepository from '../../../infrastructure/repository/TodoItemRepository.js';

const router = express.Router();
const todoItemRepository = new TodoItemRepository(); // Instantiate the repository

router.patch('/:id', async (req, res) => {
  try {
    const todoID = req.params.id; // Get todoID from URL parameters
    const { todoTitle, description, dueDate, priorityLevel, category, tags } = req.body;

    const result = await UpdateTodoItemCommand.execute({
      todoID,
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      category,
      tags,
      todoItemRepository, // Pass the repository instance
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message.includes('not found')) {
      res.status(404).json({ message: err.message });
    } else if (err.message.includes('required')) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.', error: err.message });
    }
  }
});

export default {
  routeBase: '/todos', // Updated for RESTful resource naming
  router,
};