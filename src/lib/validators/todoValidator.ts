import { Todo, ValidationResult } from '../types';

export function validateTodo(todo: Partial<Todo>): ValidationResult {
  const errors: string[] = [];

  // タイトルの検証
  if (!todo.title?.trim()) {
    errors.push('Title is required');
  }
  if (todo.title && todo.title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }

  // 説明の検証
  if (todo.description && todo.description.length > 500) {
    errors.push('Description must be 500 characters or less');
  }

  // 期限の検証
  if (todo.dueDate) {
    const dueDate = new Date(todo.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.push('Due date is invalid');
    }
  }

  // 優先度の検証
  if (todo.priority && !['high', 'medium', 'low'].includes(todo.priority)) {
    errors.push('Priority must be high, medium, or low');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateTodoTitle(title: string): ValidationResult {
  const errors: string[] = [];

  if (!title.trim()) {
    errors.push('Title is required');
  }
  if (title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }
  if (title.trim().length < 2) {
    errors.push('Title must be at least 2 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateDueDate(dueDate: string): ValidationResult {
  const errors: string[] = [];

  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    errors.push('Due date is invalid');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
