import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "../../types/types";
import dayjs from "dayjs";
import type { TFunction } from "i18next";
import type { UseMutationResult } from "@tanstack/react-query";

interface TaskTableRowProps {
  task: Task;
  t: TFunction;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (task: Task) => void;
  getPriorityBadgeVariant: (
    priority: "low" | "medium" | "high" | undefined
  ) => "default" | "secondary" | "destructive" | "outline" | null | undefined;
  unassignMutation?: UseMutationResult<
    unknown,
    unknown,
    { id: string; workerId: number }
  >;
  onOpenAssignModal?: (task: Task) => void;
  onRowClick?: (task: Task) => void;
  workers?: unknown;
  assigning?: unknown;
  setAssigning?: unknown;
  assignMutation?: unknown;
}

export const TaskTableRow: React.FC<TaskTableRowProps> = ({
  task,
  t,
  onEdit,
  onDelete,
  onToggleCompleted,
  getPriorityBadgeVariant,
  unassignMutation,
  onOpenAssignModal,
  onRowClick,
}) => (
  <TableRow
    key={task.documentId}
    style={onRowClick ? { cursor: "pointer" } : {}}
    onClick={
      onRowClick
        ? (e) => {
            if (
              (e.target as HTMLElement).closest(
                "button, input, [role=checkbox]"
              )
            )
              return;
            onRowClick(task);
          }
        : undefined
    }
  >
    <TableCell>
      <Checkbox
        checked={task.completed}
        aria-label={
          task.completed
            ? t("taskList.task.aria.completed")
            : t("taskList.task.aria.markAsCompleted")
        }
        onCheckedChange={() => onToggleCompleted(task)}
      />
    </TableCell>
    <TableCell className="font-medium">{task.title}</TableCell>
    <TableCell>
      {task.priority ? (
        <Badge variant={getPriorityBadgeVariant(task.priority)}>
          {t(`taskList.priority.${task.priority.toLowerCase()}` as const)}
        </Badge>
      ) : (
        "-"
      )}
    </TableCell>
    <TableCell>
      {task.due_date ? dayjs(task.due_date).format("DD MMM YYYY") : "N/A"}
    </TableCell>
    <TableCell>
      {task.worker ? (
        <span>{task.worker.username}</span>
      ) : (
        <span className="text-muted-foreground">
          {t("taskList.notAssigned")}
        </span>
      )}
    </TableCell>
    <TableCell>
      {task.worker && unassignMutation ? (
        <Button
          type="button"
          size="sm"
          variant="destructive"
          className="mr-2"
          disabled={unassignMutation.isPending}
          onClick={() =>
            unassignMutation.mutate({
              id: task.documentId,
              workerId: task.worker!.id,
            })
          }
        >
          {unassignMutation.isPending
            ? t("taskList.removing")
            : t("taskList.remove")}
        </Button>
      ) : !task.worker ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mr-2"
          onClick={() => onOpenAssignModal && onOpenAssignModal(task)}
        >
          {t("taskList.assign")}
        </Button>
      ) : null}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onEdit(task)}
        className="mr-2"
      >
        {t("taskList.edit")}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(task.documentId)}
      >
        {t("taskList.delete")}
      </Button>
    </TableCell>
  </TableRow>
);
