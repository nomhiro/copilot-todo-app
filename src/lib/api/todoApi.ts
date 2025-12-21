import { Todo, FilterOptions } from '../types';

const API_BASE = '/api/todos';

// BUG-004: 非同期エラーハンドリング不備
// エラーが発生してもcatchされない場合がある
export async function fetchTodos(filters?: FilterOptions): Promise<Todo[]> {
  const params = new URLSearchParams();
  if (filters?.priority) params.append('priority', filters.priority);
  if (filters?.completed !== undefined) params.append('completed', String(filters.completed));
  if (filters?.search) params.append('search', filters.search);

  const url = params.toString() ? `${API_BASE}?${params}` : API_BASE;

  // BUG: レスポンスのステータスコードをチェックしていない
  const response = await fetch(url);
  return response.json();
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  return response.json();
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}

export async function toggleTodoComplete(id: string, completed: boolean): Promise<Todo> {
  return updateTodo(id, { completed });
}
