import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoStore } from "@/store/useTodoStore";
import { Screen } from "@/components/Screen";
import { useTranslation } from "react-i18next";

const LocalTodosPage: React.FC = () => {
  const { t } = useTranslation();
  const { todos, addTodo, toggleTodo, removeTodo, reset } = useTodoStore();
  const [input, setInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  return (
    <Screen>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("localTodos.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-2 mb-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("localTodos.inputPlaceholder")}
            />
            <Button type="submit">{t("localTodos.add")}</Button>
          </form>
          <ul className="space-y-2">
            {todos.length === 0 && (
              <li className="text-muted-foreground">{t("localTodos.empty")}</li>
            )}
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between gap-2 p-2 border rounded-md"
              >
                <span
                  className={
                    todo.done ? "line-through text-muted-foreground" : ""
                  }
                  onClick={() => toggleTodo(todo.id)}
                  style={{ cursor: "pointer" }}
                  title={t("localTodos.toggleTitle")}
                >
                  {todo.text}
                </span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeTodo(todo.id)}
                >
                  {t("localTodos.delete")}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md mt-4">
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => reset()}
            className="w-full"
          >
            {t("localTodos.deleteAll")}
          </Button>
        </CardContent>
      </Card>
    </Screen>
  );
};

export default LocalTodosPage;
