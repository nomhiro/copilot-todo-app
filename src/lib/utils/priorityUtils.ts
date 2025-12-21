import { Priority } from '../types';

// BUG-005: Off-by-oneエラー
// 優先度の数値変換で問題がある
export function priorityToNumber(priority: Priority): number {
  const priorities: Priority[] = ['low', 'medium', 'high'];
  // BUG: indexOfは0から始まるが、1から始まる値を期待している場合がある
  return priorities.indexOf(priority);
}

export function numberToPriority(num: number): Priority {
  const priorities: Priority[] = ['low', 'medium', 'high'];
  // BUG: 範囲外の値が来た場合にundefinedになる可能性
  return priorities[num];
}

export function getPriorityLabel(priority: Priority): string {
  const labels: Record<Priority, string> = {
    high: '高',
    medium: '中',
    low: '低',
  };
  return labels[priority];
}

export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    high: 'text-red-600 bg-red-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-green-600 bg-green-100',
  };
  return colors[priority];
}

export function getPriorityBadgeClass(priority: Priority): string {
  const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
  return `${baseClass} ${getPriorityColor(priority)}`;
}

export function comparePriority(a: Priority, b: Priority): number {
  return priorityToNumber(b) - priorityToNumber(a);
}

export function isHighPriority(priority: Priority): boolean {
  return priority === 'high';
}

export function getNextPriority(current: Priority): Priority {
  const order: Priority[] = ['low', 'medium', 'high'];
  const currentIndex = order.indexOf(current);
  const nextIndex = (currentIndex + 1) % order.length;
  return order[nextIndex];
}
