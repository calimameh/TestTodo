import TodoItem from '../entity/TodoItem.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoItemCommand {
  static async execute({ todoTitle, description, dueDate, priorityLevel, category, tags }) {
    const currentDate = new Date();
    const parsedDueDate = new Date(dueDate);

    currentDate.setHours(0, 0, 0, 0);
    parsedDueDate.setHours(0, 0, 0, 0);

    if (parsedDueDate < currentDate) {
      throw new Error('dueDate must be a future date');
    }

    const todoItem = new TodoItem({
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      category,
      tags,
    });

    await db.insert('TodoItem', todoItem.toJSON());
    return todoItem.toJSON();
  }
}

export default CreateTodoItemCommand;