import TodoItem from '../entity/TodoItem.js';
import db from '../../infrastructure/db/index.js';

class DeleteTodoItemCommand {
  static async execute({ todoID, deletionReason }) {
    const todoItemData = await db.findById('TodoItem', todoID);

    if (!todoItemData) {
      throw new Error('Todo item not found.');
    }

    const todoItem = new TodoItem(todoItemData);
    todoItem.deletionReason = deletionReason;
    todoItem.isDeleted = true;
    todoItem.deletedAt = new Date();

    await db.update('TodoItem', todoItem.todoID, todoItem.toJSON());
  }
}

export default DeleteTodoItemCommand;