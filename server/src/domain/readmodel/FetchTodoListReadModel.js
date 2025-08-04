import db from '../../infrastructure/db/index.js';

class FetchTodoListReadModel {
  /**
   * Queries the database to fetch a list of TodoItem objects.
   * Assumes the 'TodoItem' entity in the database has properties
   * matching the Swagger specification (e.g., todoID, todoTitle, etc.).
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of TodoItem objects.
   */
  static async query() {
    // Assuming the entity name for TodoItem is 'TodoItem' in the database.
    // The database layer is expected to return objects with properties matching the Swagger schema.
    return await db.findAll('TodoItem');
  }
}

export default FetchTodoListReadModel;