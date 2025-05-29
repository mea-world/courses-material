import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import type { Task, Worker } from "../../types/types";
import { TaskTableRow } from "./TaskTableRow";
import type { UseMutationResult } from "@tanstack/react-query";
import type { TFunction } from "i18next";

interface TaskTableProps {
  tasks: Task[];
  t: TFunction;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (task: Task) => void;
  getPriorityBadgeVariant: (
    priority: "low" | "medium" | "high" | undefined
  ) => "default" | "secondary" | "destructive" | "outline" | null | undefined;
  workers?: Worker[];
  assigning?: string | null;
  setAssigning?: React.Dispatch<React.SetStateAction<string | null>>;
  assignMutation?: UseMutationResult<
    unknown,
    unknown,
    { id: string; workerId: number }
  >;
  unassignMutation?: UseMutationResult<
    unknown,
    unknown,
    { id: string; workerId: number }
  >;
  onOpenAssignModal?: (task: Task) => void;
  onRowClick?: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  t,
  onEdit,
  onDelete,
  onToggleCompleted,
  getPriorityBadgeVariant,
  workers,
  assigning,
  setAssigning,
  assignMutation,
  unassignMutation,
  onOpenAssignModal,
  onRowClick,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">{t("taskList.table.status")}</TableHead>
        <TableHead>{t("taskList.table.title")}</TableHead>
        <TableHead className="w-[150px]">
          {t("taskList.table.priority")}
        </TableHead>
        <TableHead className="w-[150px]">
          {t("taskList.table.dueDate")}
        </TableHead>
        <TableHead className="w-[180px]">
          {t("taskList.table.assignedTo")}
        </TableHead>
        <TableHead className="w-[120px]">Azioni</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tasks.map((task) => (
        <TaskTableRow
          key={task.documentId}
          task={task}
          t={t}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
          getPriorityBadgeVariant={getPriorityBadgeVariant}
          workers={workers}
          assigning={assigning}
          setAssigning={setAssigning}
          assignMutation={assignMutation}
          unassignMutation={unassignMutation}
          onOpenAssignModal={onOpenAssignModal}
          onRowClick={onRowClick}
        />
      ))}
    </TableBody>
  </Table>
);
