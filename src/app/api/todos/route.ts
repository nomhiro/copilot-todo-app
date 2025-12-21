import { NextRequest, NextResponse } from 'next/server';
import { getTodos, createTodo } from '@/lib/data/mockTodos';
import { applyFilters } from '@/lib/utils/filterUtils';
import { validateTodo } from '@/lib/validators/todoValidator';
import { FilterOptions, Priority } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters: FilterOptions = {};

  const priority = searchParams.get('priority');
  if (priority && ['high', 'medium', 'low'].includes(priority)) {
    filters.priority = priority as Priority;
  }

  const completed = searchParams.get('completed');
  if (completed !== null) {
    filters.completed = completed === 'true';
  }

  const search = searchParams.get('search');
  if (search) {
    filters.search = search;
  }

  let todos = getTodos();
  todos = applyFilters(todos, filters);

  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateTodo(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const newTodo = createTodo({
      title: body.title,
      description: body.description,
      completed: body.completed ?? false,
      priority: body.priority ?? 'medium',
      dueDate: body.dueDate,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
