import { Todo } from '../types';

export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'プロジェクトの初期設定を完了する',
    description: 'Next.jsプロジェクトをセットアップし、必要な依存関係をインストールする',
    completed: true,
    priority: 'high',
    dueDate: '2024-12-20',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-18T14:30:00Z',
  },
  {
    id: '2',
    title: 'ユーザー認証機能の実装',
    description: 'ログイン・ログアウト機能を実装する',
    completed: false,
    priority: 'high',
    dueDate: '2024-12-25',
    createdAt: '2024-12-16T09:00:00Z',
    updatedAt: '2024-12-16T09:00:00Z',
  },
  {
    id: '3',
    title: 'ドキュメントの更新',
    description: 'READMEファイルを最新の情報に更新する',
    completed: false,
    priority: 'low',
    dueDate: '2024-12-30',
    createdAt: '2024-12-17T11:00:00Z',
    updatedAt: '2024-12-17T11:00:00Z',
  },
  {
    id: '4',
    title: 'バグ修正: フォーム送信エラー',
    description: 'フォーム送信時にエラーが発生する問題を修正する',
    completed: false,
    priority: 'medium',
    dueDate: '2024-12-22',
    createdAt: '2024-12-18T08:00:00Z',
    updatedAt: '2024-12-18T08:00:00Z',
  },
  {
    id: '5',
    title: 'テストケースの追加',
    description: 'ユニットテストとインテグレーションテストを追加する',
    completed: false,
    priority: 'medium',
    createdAt: '2024-12-19T10:00:00Z',
    updatedAt: '2024-12-19T10:00:00Z',
  },
  {
    id: '6',
    title: 'パフォーマンス最適化',
    description: 'ページ読み込み速度を改善する',
    completed: true,
    priority: 'low',
    dueDate: '2024-12-15',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-14T16:00:00Z',
  },
];

let todos = [...mockTodos];

export function getTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find(todo => todo.id === id);
}

export function createTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Todo {
  const newTodo: Todo = {
    ...todo,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: string, updates: Partial<Todo>): Todo | null {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return todos[index];
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
}

export function resetTodos(): void {
  todos = [...mockTodos];
}
