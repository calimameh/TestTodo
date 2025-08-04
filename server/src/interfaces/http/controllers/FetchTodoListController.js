import express from 'express';
import FetchTodoListReadModel from '../../../domain/readmodel/FetchTodoListReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todoList = await FetchTodoListReadModel.query();
    res.json(todoList);
  } catch (err) {
    // According to Swagger, a 400 Bad Request is possible.
    // In a real application, more specific error handling would differentiate between
    // client-side bad requests and server-side internal errors.
    // For this generic catch-all, 500 is more appropriate for unexpected server errors.
    res.status(500).json({ message: err.message });
  }
});

export default {
  // The routeBase matches the Swagger path '/fetch-todo-list' and the kebab-case of the read model name.
  routeBase: '/fetch-todo-list',
  router,
};