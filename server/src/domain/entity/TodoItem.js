import { v4 as uuidv4 } from 'uuid';

class TodoItem {
  constructor({ id = uuidv4(), todoTitle, description, dueDate, priorityLevel, category, tags, isCompleted = false, createdAt = new Date(), updatedAt = new Date() }) {
    if (!todoTitle || typeof todoTitle !== 'string' || todoTitle.trim().length === 0) {
      throw new Error('Todo title is required.');
    }
    if (!dueDate) {
      throw new Error('Due date is required.');
    }

    this.id = id;
    this.todoTitle = todoTitle;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priorityLevel = priorityLevel; // e.g., 'Low', 'Medium', 'High'
    this.category = category; // e.g., 'Work', 'Personal', 'Shopping'
    this.tags = tags || []; // Array of strings
    this.isCompleted = isCompleted;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  markAsCompleted() {
    this.isCompleted = true;
    this.updatedAt = new Date();
  }

  updateDetails({ description, dueDate, priorityLevel, category, tags }) {
    if (description !== undefined) this.description = description;
    if (dueDate !== undefined) this.dueDate = new Date(dueDate);
    if (priorityLevel !== undefined) this.priorityLevel = priorityLevel;
    if (category !== undefined) this.category = category;
    if (tags !== undefined) this.tags = tags;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      todoTitle: this.todoTitle,
      description: this.description,
      dueDate: this.dueDate.toISOString().split('T')[0], // YYYY-MM-DD format
      priorityLevel: this.priorityLevel,
      category: this.category,
      tags: this.tags,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export default TodoItem;