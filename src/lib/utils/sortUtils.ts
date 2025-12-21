import { Todo, SortOptions, Priority } from '../types';

/**
 * TODOリストを指定されたオプションでソートする
 *
 * @param todos - ソート対象のTODOリスト
 * @param options - ソートオプション（フィールドと方向）
 * @returns ソートされたTODOリスト
 */
export function sortTodos(todos: Todo[], options: SortOptions): Todo[] {
  const { field, direction } = options;
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...todos].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'title':
        comparison = a.title.localeCompare(b.title, 'ja');
        break;

      case 'priority':
        const priorityOrder: Record<Priority, number> = {
          high: 0,
          medium: 1,
          low: 2,
        };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;

      case 'dueDate':
        if (!a.dueDate && !b.dueDate) {
          comparison = 0;
        } else if (!a.dueDate) {
          comparison = 1;
        } else if (!b.dueDate) {
          comparison = -1;
        } else {
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        break;

      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return comparison * multiplier;
  });
}

/**
 * 複数の条件でTODOリストをソートする
 *
 * @param todos - ソート対象のTODOリスト
 * @param sortOptions - ソートオプションの配列（優先順）
 * @returns ソートされたTODOリスト
 */
export function multiSort(todos: Todo[], sortOptions: SortOptions[]): Todo[] {
  if (sortOptions.length === 0) return todos;

  return [...todos].sort((a, b) => {
    for (const options of sortOptions) {
      const sorted = sortTodos([a, b], options);
      if (sorted[0] !== a) return 1;
      if (sorted[0] === a && sorted[1] !== b) return -1;
    }
    return 0;
  });
}
