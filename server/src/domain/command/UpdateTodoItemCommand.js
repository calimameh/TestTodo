import TodoItem from '../entity/TodoItem.js';

class UpdateTodoItemCommand {
  static async execute({ todoID, todoTitle, description, dueDate, priorityLevel, category, tags, todoItemRepository }) {
    if (!todoID) {
      throw new Error('Todo ID is required for update.');
    }

    const existingTodoItem = await todoItemRepository.findById(todoID);

    if (!existingTodoItem) {
      throw new Error(`Todo item with ID '${todoID}' not found.`);
    }

    // Update the properties of the entity
    existingTodoItem.update({
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      category,
      tags,
    });

    await todoItemRepository.update(existingTodoItem);

    return existingTodoItem.toJSON();
  }
}

export default UpdateTodoItemCommand;