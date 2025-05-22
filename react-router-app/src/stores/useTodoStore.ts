import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  reset: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) =>
        set(
          produce((state: TodoStore) => {
            state.todos.push({ id: Date.now(), text, done: false });
          })
        ),

      toggleTodo: (id) =>
        set(
          produce((state: TodoStore) => {
            const todo = state.todos.find((t) => t.id === id);
            if (todo) {
              todo.done = !todo.done;
            }
          })
        ),

      removeTodo: (id) =>
        set(
          produce((state: TodoStore) => {
            state.todos = state.todos.filter((t) => t.id !== id);
          })
        ),

      reset: () =>
        set(
          produce((state: TodoStore) => {
            state.todos = [];
          })
        ),
    }),
    {
      name: "todo-storage",
    }
  )
);
