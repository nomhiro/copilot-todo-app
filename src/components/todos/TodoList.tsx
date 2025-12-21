'use client';

import { useState, useEffect } from 'react';
import { Todo, FilterOptions } from '@/lib/types';
import { fetchTodos, deleteTodo, toggleTodoComplete } from '@/lib/api/todoApi';
import TodoCard from './TodoCard';
import TodoFilter from './TodoFilter';
import TodoSearch from './TodoSearch';

// BUG-003: useEffect依存配列の問題
// filtersが変更されても再フェッチされない場合がある
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  // BUG: filtersを依存配列に入れていないため、フィルター変更時に再フェッチされない
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos(filters);
      setTodos(data);
    } catch {
      setError('TODOの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleTodoComplete(id, completed);
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      ));
    } catch {
      setError('更新に失敗しました');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch {
      setError('削除に失敗しました');
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
        <button
          onClick={loadTodos}
          className="ml-4 underline hover:no-underline"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <TodoSearch onSearch={handleSearch} />
        </div>
        <TodoFilter filters={filters} onChange={handleFilterChange} />
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          TODOがありません
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
