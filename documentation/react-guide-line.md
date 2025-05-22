# Guidelines for Developing a React Application Independently

## Initial Setup with Vite + TypeScript

```bash
# Create a new project
npm create vite@latest project-name -- --template react-ts
cd project-name

# Install dependencies
npm install

# Run the project locally
npm run dev
```

## Recommended Libraries to Install

```bash
# State management
npm install zustand

# API queries and mutations
npm install @tanstack/react-query

# Form validation
npm install react-hook-form zod

# Translations
npm install react-i18next i18next

# Date utilities
npm install date-fns

# UI components (e.g. shadcn)
npx shadcn-ui@latest init
```

## Suggested Project Structure

```
src/
├── api/            # axios calls and validation
├── assets/         # images, icons, etc.
├── components/     # reusable UI components
├── lib/            # axiosInstance, queryClient, i18n...
├── stores/         # Zustand store
├── types/          # TypeScript types and Zod schemas
├── adapters/       # Data mappers
├── pages/          # Views or main routes
└── App.tsx         # Entry point
```

## Best Practices

- Organize files well to maintain separation between logic, UI, and data
- Use mappers (adapters) to transform data between backend and frontend
- Centralize API calls and configure `axiosInstance` with token and error handling
- Always validate data received with Zod
- Avoid putting business logic directly in components: use hooks or separate controllers
- Write clear types (`type`, `interface`) for each entity (e.g., `Task`, `User`)

## Suggested Architectural Patterns

- `Singleton + Observer` → Zustand (shared and reactive store)
- `Adapter` → map data from API to frontend and back
- `MVC`:

  - Model: types, Zod schema, adapters
  - View: UI components
  - Controller: functions/actions in stores or services

## Optional: Testing

```bash
npm install vitest @testing-library/react @testing-library/jest-dom
```

## Development Workflow

1. Create an adapter and data types
2. Write a typed and validated API call with Zod
3. Connect it via a hook with React Query
4. Display data with simple UI components
5. Add a form with RHF + Zod validation
6. Use Zustand if shared state is needed
7. Translate the interface with i18n
