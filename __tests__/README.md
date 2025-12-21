# Tests Directory

This directory is for unit tests and integration tests.

## Test Framework
- Jest
- React Testing Library

## Hands-on Exercise (Section 13)

Use GitHub Copilot to generate tests for the following files:

### Priority 1: Validators
- `lib/validators/todoValidator.ts`
  - Test `validateTodo()` with various edge cases
  - Test `validateTodoTitle()` with empty, short, and long strings
  - Test `validateDueDate()` with valid and invalid dates

### Priority 2: Utility Functions
- `lib/utils/dateUtils.ts`
  - Test `addDays()` - Note: This function has a bug (BUG-001)
  - Test `isOverdue()` with past, today, and future dates
  - Test `formatDueDate()` with various date scenarios

- `lib/utils/filterUtils.ts`
  - Test `filterByPriority()` with all priority levels
  - Test `filterByCompleted()` with true, false, and undefined
  - Test `applyFilters()` with combined filters

### Priority 3: Stats Functions
- `lib/utils/statsUtils.ts`
  - Test `calculateStats()` with empty, partial, and full completion
  - Test `getProductivityScore()` with various scenarios

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Writing Tests with Copilot

1. Open the target file (e.g., `lib/validators/todoValidator.ts`)
2. Use Copilot Chat with `/tests` command
3. Review and adjust the generated tests
4. Add edge cases suggested by Copilot
