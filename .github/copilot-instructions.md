# GitHub Copilot Instructions for TODO App

## Project Context
This is a Next.js 14 TODO application using App Router.
The project uses TypeScript, Tailwind CSS, and follows React best practices.
This application is designed for GitHub Copilot certification course hands-on exercises.

## Technology Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- React 18

## Coding Standards
- Use functional components with hooks
- Prefer arrow functions for component definitions
- Use TypeScript strict mode
- Follow Tailwind CSS utility-first approach
- Use 'use client' directive only when necessary (for client-side interactivity)

## File Naming Conventions
- Components: PascalCase (e.g., TodoCard.tsx)
- Utilities: camelCase (e.g., dateUtils.ts)
- Types: PascalCase for interfaces, camelCase for type aliases
- Pages: lowercase with kebab-case for routes

## Directory Structure
- `app/`: Next.js App Router pages and API routes
- `components/`: React components (ui/, layout/, todos/)
- `lib/`: Utilities, types, validators, and data

## Testing Guidelines
- Use Jest and React Testing Library
- Test file naming: *.test.ts or *.test.tsx
- Aim for edge case coverage
- Focus on component behavior, not implementation details

## Security Considerations
- Never include API keys or secrets in code suggestions
- Validate all user inputs
- Use parameterized queries for any database operations
- Sanitize user input before rendering

## Code Review Guidelines
- Check for TypeScript type safety
- Verify proper error handling
- Ensure accessibility (ARIA labels, keyboard navigation)
- Look for performance optimizations (memoization, lazy loading)
