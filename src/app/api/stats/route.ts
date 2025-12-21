import { NextResponse } from 'next/server';
import { getTodos } from '@/lib/data/mockTodos';
import { calculateStats, getPriorityBreakdown, getProductivityScore } from '@/lib/utils/statsUtils';

export async function GET() {
  const todos = getTodos();
  const stats = calculateStats(todos);
  const priorityBreakdown = getPriorityBreakdown(todos);
  const productivityScore = getProductivityScore(todos);

  return NextResponse.json({
    ...stats,
    priorityBreakdown,
    productivityScore,
  });
}
