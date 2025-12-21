import { Todo, FilterOptions, Priority } from '../types';

// BUG-002: フィルター条件の論理エラー
// completed フィルターが正しく動作しない
export function filterTodos(todos: Todo[], options: FilterOptions): Todo[] {
  return todos.filter(todo => {
    if (options.priority && todo.priority !== options.priority) {
      return false;
    }

    // BUG: completedがundefinedの場合も弾いてしまう
    if (options.completed !== undefined && todo.completed === options.completed) {
      return false;
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      const titleMatch = todo.title.toLowerCase().includes(searchLower);
      const descMatch = todo.description?.toLowerCase().includes(searchLower);
      if (!titleMatch && !descMatch) {
        return false;
      }
    }

    return true;
  });
}

export function sortByPriority(todos: Todo[]): Todo[] {
  const priorityOrder: Record<Priority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

export function sortByDueDate(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

export function sortByCreatedAt(todos: Todo[], direction: 'asc' | 'desc' = 'desc'): Todo[] {
  return [...todos].sort((a, b) => {
    const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return direction === 'asc' ? diff : -diff;
  });
}

export function getCompletedTodos(todos: Todo[]): Todo[] {
  return todos.filter(todo => todo.completed);
}

export function getPendingTodos(todos: Todo[]): Todo[] {
  return todos.filter(todo => !todo.completed);
}

export function getTodosByPriority(todos: Todo[], priority: Priority): Todo[] {
  return todos.filter(todo => todo.priority === priority);
}
