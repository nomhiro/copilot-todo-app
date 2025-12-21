import TodoForm from '@/components/todos/TodoForm';

export default function NewTodoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新規TODO作成</h1>
        <p className="text-gray-600 mt-1">新しいタスクを追加します</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <TodoForm mode="create" />
      </div>
    </div>
  );
}
