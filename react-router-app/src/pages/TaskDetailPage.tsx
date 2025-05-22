import React from "react";
import { useParams } from "react-router-dom";
import { Screen } from "../components/Screen";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../api/taskApi";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  console.log(taskId);
  const { t } = useTranslation();
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId || ""),
  });

  return (
    <Screen>
      <div className="max-w-xl mx-auto mt-8 p-6 bg-card rounded shadow">
        {isLoading && <div>{t("taskDetail.loading")}</div>}
        {error && (
          <div className="text-destructive">
            {t("taskDetail.error", { message: error.message })}
          </div>
        )}
        {task && (
          <>
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <div className="mb-2">
              <span className="font-semibold">
                {t("taskDetail.description")}:
              </span>{" "}
              {task.description || (
                <span className="text-muted-foreground">
                  {t("taskDetail.noDescription")}
                </span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">{t("taskDetail.dueDate")}:</span>{" "}
              {task.due_date
                ? new Date(task.due_date).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">{t("taskDetail.priority")}:</span>{" "}
              <Badge
                variant={
                  task.priority === "high"
                    ? "destructive"
                    : task.priority === "medium"
                      ? "secondary"
                      : "outline"
                }
              >
                {t(`taskList.priority.${task.priority}`)}
              </Badge>
            </div>
            <div className="mb-2">
              <span className="font-semibold">
                {t("taskDetail.completed")}:
              </span>{" "}
              {task.completed ? t("taskDetail.yes") : t("taskDetail.no")}
            </div>
            <div className="mb-2">
              <span className="font-semibold">
                {t("taskDetail.assignedTo")}:
              </span>{" "}
              {task.worker ? (
                `${task.worker.username} (${task.worker.email})`
              ) : (
                <span className="text-muted-foreground">
                  {t("taskDetail.unassigned")}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </Screen>
  );
};

export default TaskDetailPage;
