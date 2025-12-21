import { getTodoById } from '@/lib/data/mockTodos';
import TodoForm from '@/components/todos/TodoForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTodoPage({ params }: PageProps) {
  const { id } = await params;
  const todo = getTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/todos/${todo.id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          詳細に戻る
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">TODO編集</h1>
        <p className="text-gray-600 mt-1">タスクの内容を編集します</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <TodoForm todo={todo} mode="edit" />
      </div>
    </div>
  );
}
