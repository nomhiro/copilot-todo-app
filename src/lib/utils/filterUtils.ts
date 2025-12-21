import { Todo, Priority, FilterOptions } from '../types';

export function filterByPriority(todos: Todo[], priority: Priority | undefined): Todo[] {
  if (!priority) return todos;
  return todos.filter(todo => todo.priority === priority);
}

export function filterByCompleted(todos: Todo[], completed: boolean | undefined): Todo[] {
  if (completed === undefined) return todos;
  return todos.filter(todo => todo.completed === completed);
}

export function filterBySearch(todos: Todo[], search: string | undefined): Todo[] {
  if (!search || search.trim() === '') return todos;

  const searchLower = search.toLowerCase().trim();

  return todos.filter(todo => {
    const titleMatch = todo.title.toLowerCase().includes(searchLower);
    const descriptionMatch = todo.description?.toLowerCase().includes(searchLower) ?? false;
    return titleMatch || descriptionMatch;
  });
}

export function filterByDueDate(todos: Todo[], startDate?: string, endDate?: string): Todo[] {
  return todos.filter(todo => {
    if (!todo.dueDate) return false;

    const dueDate = new Date(todo.dueDate);

    if (startDate && dueDate < new Date(startDate)) return false;
    if (endDate && dueDate > new Date(endDate)) return false;

    return true;
  });
}

export function applyFilters(todos: Todo[], options: FilterOptions): Todo[] {
  let result = [...todos];

  result = filterByPriority(result, options.priority);
  result = filterByCompleted(result, options.completed);
  result = filterBySearch(result, options.search);

  return result;
}

export function getOverdueTodos(todos: Todo[]): Todo[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate < today;
  });
}

export function getTodayTodos(todos: Todo[]): Todo[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return todos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate >= today && dueDate < tomorrow;
  });
}
