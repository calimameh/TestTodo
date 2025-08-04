import express from 'express';
import GetTodoItemDetailsReadModel from '../../../domain/readmodel/GetTodoItemDetailsReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todoItemDetails = await GetTodoItemDetailsReadModel.query();

    if (!todoItemDetails) {
      // As per Swagger, 200 response contains an object. If no item found
      // and no parameters to specify, an empty object is a valid 200 response.
      return res.status(200).json({});
    }

    res.status(200).json(todoItemDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-todo-item-details',
  router,
};