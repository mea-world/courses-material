import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  assignTaskToWorker,
  createTask,
  deleteTask,
  getTasks,
  unassignTaskFromWorker,
  updateTask,
} from "../api/taskApi";
import { getWorkers } from "../api/workerApi";
import type { Task } from "../types/types";
import { TaskForm } from "./TaskList/TaskForm";
import { TaskTable } from "./TaskList/TaskTable";

const TaskList: React.FC = () => {
  const { t } = useTranslation();
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [form, setForm] = useState<Partial<Task>>({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
  });
  const { data: workers } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });
  const assignMutation = useMutation({
    mutationFn: ({ id, workerId }: { id: string; workerId: number }) =>
      assignTaskToWorker(id, workerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const unassignMutation = useMutation({
    mutationFn: ({ id, workerId }: { id: string; workerId: number }) =>
      unassignTaskFromWorker(id, workerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const [assigning, setAssigning] = useState<string | null>(null);
  const [assignModalTask, setAssignModalTask] = useState<Task | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<string>("");

  const createMutation = useMutation<Task, Error, Partial<Task>>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
      setForm({
        title: "",
        description: "",
        due_date: "",
        priority: "medium",
      });
    },
  });

  const updateMutation = useMutation<
    Task,
    Error,
    { id: string; data: Partial<Task> }
  >({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
      setEditTask(null);
      setForm({
        title: "",
        description: "",
        due_date: "",
        priority: "medium",
      });
    },
  });

  const deleteMutation = useMutation<boolean, Error, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleOpenCreate = () => {
    setEditTask(null);
    setForm({ title: "", description: "", due_date: "", priority: "medium" });
    setOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditTask(task);
    setForm({
      title: task.title,
      description: task.description,
      due_date: task.due_date || "",
      priority: task.priority,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTask) {
      updateMutation.mutate({ id: editTask.documentId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Sei sicuro di voler eliminare questo task?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleCompleted = (task: Task) => {
    updateMutation.mutate({
      id: task.documentId,
      data: { completed: !task.completed },
    });
  };

  const getPriorityBadgeVariant = (
    priority: "low" | "medium" | "high" | undefined
  ) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "default";
    }
  };

  // Ordinamento: prima non completati per priorità, poi completati per priorità
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const sortedTasks = tasks?.slice().sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // completati in fondo
    }
    const pa = priorityOrder[a.priority] || 0;
    const pb = priorityOrder[b.priority] || 0;
    return pb - pa;
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("taskList.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            {t("taskList.error.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("taskList.error.fetch", { message: error.message })}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("taskList.title")}</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>{t("taskList.create")}</Button>
          </DialogTrigger>
          <DialogContent>
            <TaskForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              loading={createMutation.isPending || updateMutation.isPending}
              editTask={editTask}
              t={t}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={!!assignModalTask}
          onOpenChange={(v) => {
            if (!v) setAssignModalTask(null);
          }}
        >
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (assignModalTask && selectedWorker) {
                  assignMutation.mutate({
                    id: assignModalTask.documentId,
                    workerId: Number(selectedWorker),
                  });
                  setAssignModalTask(null);
                  setSelectedWorker("");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="worker-select"
                  className="block mb-2 font-medium"
                >
                  {t("taskList.assignTo")}
                </label>
                <select
                  id="worker-select"
                  name="workerId"
                  className="w-full border rounded-md p-2"
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  required
                >
                  <option value="">{t("taskList.select")}</option>
                  {workers &&
                    workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.username} ({worker.email})
                      </option>
                    ))}
                </select>
              </div>
              <Button
                type="submit"
                disabled={assignMutation.isPending}
                className="w-full"
              >
                {assignMutation.isPending
                  ? t("taskList.assigning")
                  : t("taskList.assign")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {sortedTasks && sortedTasks.length > 0 ? (
          <TaskTable
            tasks={sortedTasks}
            t={t.bind(null)}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            getPriorityBadgeVariant={getPriorityBadgeVariant}
            workers={workers}
            assigning={assigning}
            setAssigning={setAssigning}
            assignMutation={assignMutation}
            unassignMutation={unassignMutation}
            onOpenAssignModal={setAssignModalTask}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t("taskList.empty")}</p>
            <Button onClick={handleOpenCreate}>{t("taskList.create")}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
