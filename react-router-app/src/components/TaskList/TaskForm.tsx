import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "../../types/types";
import type { TFunction } from "i18next";

interface TaskFormProps {
  form: Partial<Task>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Task>>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  editTask: Task | null;
  t: TFunction;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  form,
  setForm,
  onSubmit,
  loading,
  editTask,
  t,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <DialogHeader>
      <DialogTitle>
        {editTask ? t("taskList.editTitle") : t("taskList.createTitle")}
      </DialogTitle>
    </DialogHeader>
    <div>
      <Label htmlFor="title">{t("taskList.form.title")}</Label>
      <Input
        id="title"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        required
      />
    </div>
    <div>
      <Label htmlFor="description">{t("taskList.form.description")}</Label>
      <Textarea
        rows={3}
        id="description"
        value={form.description || ""}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
      />
    </div>
    <div>
      <Label htmlFor="due_date">{t("taskList.form.dueDate")}</Label>
      <Input
        id="due_date"
        type="date"
        value={form.due_date ? form.due_date.slice(0, 10) : ""}
        onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
      />
    </div>
    <div>
      <Label htmlFor="priority">{t("taskList.form.priority")}</Label>
      <select
        id="priority"
        className="w-full border rounded-md p-2"
        value={form.priority}
        onChange={(e) =>
          setForm((f) => ({
            ...f,
            priority: e.target.value as Task["priority"],
          }))
        }
      >
        <option value="low">{t("taskList.priority.low")}</option>
        <option value="medium">{t("taskList.priority.medium")}</option>
        <option value="high">{t("taskList.priority.high")}</option>
      </select>
    </div>
    <DialogFooter>
      <Button type="submit" disabled={loading}>
        {editTask ? t("taskList.save") : t("taskList.add")}
      </Button>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          {t("taskList.cancel")}
        </Button>
      </DialogClose>
    </DialogFooter>
  </form>
);
