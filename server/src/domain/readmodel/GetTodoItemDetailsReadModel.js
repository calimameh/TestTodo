import db from '../../infrastructure/db/index.js';

class GetTodoItemDetailsReadModel {
  static async query() {
    const allTodoItems = await db.findAll('TodoItem');
    const firstItem = allTodoItems[0];

    if (!firstItem) {
      return null;
    }

    // Project fields according to the OpenAPI 3.0.3 specification for the /get-todo-item-details response
    return {
      todoID: firstItem.todoID,
      todoTitle: firstItem.todoTitle,
      description: firstItem.description,
      dueDate: firstItem.dueDate,
      priorityLevel: firstItem.priorityLevel,
      category: firstItem.category,
      tags: firstItem.tags,
    };
  }
}

export default GetTodoItemDetailsReadModel;