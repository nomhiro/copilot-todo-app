import { Todo, TodoStats } from '../types';
import { isOverdue } from './dateUtils';

export function calculateStats(todos: Todo[]): TodoStats {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const overdue = todos.filter(todo => !todo.completed && isOverdue(todo.dueDate)).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    overdue,
    completionRate,
  };
}

export function getCompletionTrend(todos: Todo[], days: number = 7): number[] {
  const trend: number[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const completedOnDay = todos.filter(todo => {
      if (!todo.completed) return false;
      const updatedAt = new Date(todo.updatedAt);
      return updatedAt >= date && updatedAt < nextDate;
    }).length;

    trend.push(completedOnDay);
  }

  return trend;
}

export function getPriorityBreakdown(todos: Todo[]): Record<string, number> {
  return {
    high: todos.filter(todo => todo.priority === 'high').length,
    medium: todos.filter(todo => todo.priority === 'medium').length,
    low: todos.filter(todo => todo.priority === 'low').length,
  };
}

export function getProductivityScore(todos: Todo[]): number {
  if (todos.length === 0) return 0;

  const stats = calculateStats(todos);
  const completionWeight = 0.6;
  const overdueWeight = 0.4;

  const completionScore = stats.completionRate;
  const overdueScore = stats.total > 0 ? Math.max(0, 100 - (stats.overdue / stats.total) * 100) : 100;

  return Math.round(completionScore * completionWeight + overdueScore * overdueWeight);
}
