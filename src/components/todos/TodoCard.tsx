'use client';

import { Todo } from '@/lib/types';
import { formatDueDate, isOverdue } from '@/lib/utils/dateUtils';
import { getPriorityBadgeClass, getPriorityLabel } from '@/lib/utils/priorityUtils';
import Link from 'next/link';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoCard({ todo, onToggleComplete, onDelete }: TodoCardProps) {
  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/todos/${todo.id}`}
              className={`text-lg font-medium hover:text-blue-600 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
            >
              {todo.title}
            </Link>
            <span className={getPriorityBadgeClass(todo.priority)}>
              {getPriorityLabel(todo.priority)}
            </span>
          </div>
          {todo.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm">
            {todo.dueDate && (
              <span className={`${overdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                {formatDueDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
