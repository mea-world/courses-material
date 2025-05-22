import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/taskApi";
import type { Task } from "../types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

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
      <CardHeader>
        <CardTitle>{t("taskList.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks && tasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  {t("taskList.table.status")}
                </TableHead>
                <TableHead>{t("taskList.table.title")}</TableHead>
                <TableHead className="w-[150px]">
                  {t("taskList.table.priority")}
                </TableHead>
                <TableHead className="w-[150px]">
                  {t("taskList.table.dueDate")}
                </TableHead>
                {/* Add more headers if needed e.g., for actions, categories, tags */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      checked={task.completed}
                      aria-label={
                        task.completed
                          ? t("taskList.task.aria.completed")
                          : t("taskList.task.aria.markAsCompleted")
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    {task.priority ? (
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>
                        {t(
                          `taskList.priority.${task.priority.toLowerCase()}` as const
                        )}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {task.due_date
                      ? dayjs(task.due_date).format("DD MMM YYYY")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t("taskList.empty")}</p>
            {/* Optionally, add a button here to create a new task */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
