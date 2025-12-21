import { getTodoById } from '@/lib/data/mockTodos';
import { formatDateTime, formatDueDate, isOverdue } from '@/lib/utils/dateUtils';
import { getPriorityBadgeClass, getPriorityLabel } from '@/lib/utils/priorityUtils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TodoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const todo = getTodoById(id);

  if (!todo) {
    notFound();
  }

  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className={`text-2xl font-bold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h1>
            <span className={getPriorityBadgeClass(todo.priority)}>
              {getPriorityLabel(todo.priority)}
            </span>
            {todo.completed && (
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                完了
              </span>
            )}
          </div>
          <Link
            href={`/todos/${todo.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            編集
          </Link>
        </div>

        {todo.description && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">説明</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{todo.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h2 className="font-medium text-gray-500 mb-1">期限</h2>
            <p className={overdue ? 'text-red-600 font-medium' : 'text-gray-700'}>
              {formatDueDate(todo.dueDate)}
            </p>
          </div>
          <div>
            <h2 className="font-medium text-gray-500 mb-1">作成日時</h2>
            <p className="text-gray-700">{formatDateTime(todo.createdAt)}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-500 mb-1">更新日時</h2>
            <p className="text-gray-700">{formatDateTime(todo.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
