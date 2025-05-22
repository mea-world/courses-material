**Build a modern multilingual Task Manager web app using the following stack:**

### Tech Stack

* React + TypeScript
* React Query (data fetching/mutations)
* Zustand (global state)
* React Hook Form + Zod (form validation)
* i18next (UI localization in English and Italian)
* Day.js (date handling)
* Axios (HTTP client with auth headers)
* Shadcn/UI (UI components)
* Strapi (headless CMS backend with REST API)

### App Features

* View list of tasks with filters by category, tag, priority, and completion
* Create and edit tasks via form with validation
* Toggle completion status
* Filter tasks dynamically by category/tag
* Display and sort tasks by due date
* Switch language (EN/IT) via i18next
* Clean UI with Shadcn components
* Authenticated API requests using Axios token interceptor (token stored in memory)

### Backend Strapi Data Models (created)

#### task

* title: string (required)
* description: string
* due\_date: datetime
* completed: boolean (default: false)
* priority: enum (low, medium, high)
* categories: many-to-many → category
* tags: many-to-many → tag
* worker: one-to-one → worker

#### tag

* name: string

#### category

* name: string

#### worker

* username: string
* email: string

Tasks must be fetched from the Strapi REST API (`/api/tasks`) with related tags, categories, and worker populated.

### Folder Structure Suggestion

```
src/
├─ api/                # axios + endpoints
├─ components/         # UI components (TaskList, Form, Filter, etc.)
├─ context/            # Auth or language context
├─ lib/                # i18n, axios instance, query client
├─ stores/             # Zustand state
├─ types/              # Zod + API types
└─ App.tsx
```

### Goal

Build the app incrementally. Start with:

* Axios instance with token support
* React Query setup
* Fetch and display list of tasks
* Build the create/edit task form with Zod and Shadcn components
* Add filters, language switcher, and Zustand state


Use yarn as package manager.

You can install new shadcn components if needed using the following command:

```
npx shadcn@latest add [component-name]
```
Use a divide and conquer approach for code writing.

