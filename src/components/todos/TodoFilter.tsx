'use client';

import { FilterOptions, Priority } from '@/lib/types';

interface TodoFilterProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

export default function TodoFilter({ filters, onChange }: TodoFilterProps) {
  const handlePriorityChange = (priority: Priority | '') => {
    onChange({
      ...filters,
      priority: priority || undefined,
    });
  };

  const handleCompletedChange = (value: string) => {
    onChange({
      ...filters,
      completed: value === '' ? undefined : value === 'true',
    });
  };

  return (
    <div className="flex gap-3">
      <select
        value={filters.priority || ''}
        onChange={(e) => handlePriorityChange(e.target.value as Priority | '')}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">すべての優先度</option>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>

      <select
        value={filters.completed === undefined ? '' : String(filters.completed)}
        onChange={(e) => handleCompletedChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">すべてのステータス</option>
        <option value="false">未完了</option>
        <option value="true">完了</option>
      </select>
    </div>
  );
}
