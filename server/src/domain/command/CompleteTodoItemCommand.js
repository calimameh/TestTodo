import TodoItem from '../entity/TodoItem.js';
import db from '../../infrastructure/db/index.js';
import TodoItemNotFoundException from '../error/TodoItemNotFoundException.js';

class CompleteTodoItemCommand {
  static async execute({ todoID, completionDate, completionNotes }) {
    const todoData = await db.findById('TodoItem', todoID);

    if (!todoData) {
      throw new TodoItemNotFoundException(`Todo item with ID ${todoID} not found.`);
    }

    const todoItem = new TodoItem(todoData);
    todoItem.completionDate = completionDate;
    todoItem.completionNotes = completionNotes;

    await db.update('TodoItem', todoItem.todoID, todoItem.toJSON());
    return todoItem.toJSON();
  }
}

export default CompleteTodoItemCommand;