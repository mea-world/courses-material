import React, { useState } from "react";
import { Screen } from "../components/Screen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWorkers,
  createWorker,
  deleteWorker,
  updateWorker,
} from "../api/workerApi";
import type { Worker } from "../types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const WorkersPage: React.FC = () => {
  const queryClient = useQueryClient();
  // Workers CRUD
  const { data: workers, isLoading: loadingWorkers } = useQuery<Worker[]>({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });
  const createWorkerMutation = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setOpenCreate(false);
      setNewWorker({ username: "", email: "" });
    },
  });
  const deleteWorkerMutation = useMutation({
    mutationFn: (id: string) => deleteWorker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setDeleteModalWorker(null);
    },
  });
  const updateWorkerMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Worker> }) =>
      updateWorker(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setEditModalWorker(null);
    },
  });

  // State for create worker modal
  const [openCreate, setOpenCreate] = useState(false);
  const [newWorker, setNewWorker] = useState<{
    username: string;
    email: string;
  }>({
    username: "",
    email: "",
  });

  const [deleteModalWorker, setDeleteModalWorker] = useState<Worker | null>(
    null
  );

  const [editModalWorker, setEditModalWorker] = useState<Worker | null>(null);
  const [editWorkerData, setEditWorkerData] = useState<{
    username: string;
    email: string;
  }>({ username: "", email: "" });

  if (loadingWorkers) {
    return (
      <Screen>
        <div>Caricamento...</div>
      </Screen>
    );
  }

  return (
    <Screen>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestione Lavoratori</CardTitle>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenCreate(true)}>
                Aggiungi Lavoratore
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createWorkerMutation.mutate(newWorker);
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newWorker.username}
                    onChange={(e) =>
                      setNewWorker((w) => ({ ...w, username: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newWorker.email}
                    onChange={(e) =>
                      setNewWorker((w) => ({ ...w, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createWorkerMutation.isPending}
                  className="w-full"
                >
                  {createWorkerMutation.isPending ? "Creazione..." : "Crea"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Username</th>
                <th className="text-left p-2 border-b">Email</th>
                <th className="text-left p-2 border-b">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {workers?.map((worker) => (
                <tr key={worker.id} className="border-b">
                  <td className="p-2">{worker.username}</td>
                  <td className="p-2">{worker.email}</td>
                  <td className="p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditModalWorker(worker);
                        setEditWorkerData({
                          username: worker.username,
                          email: worker.email,
                        });
                      }}
                    >
                      Modifica
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteModalWorker(worker)}
                    >
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modale conferma eliminazione */}
          <Dialog
            open={!!deleteModalWorker}
            onOpenChange={(v) => {
              if (!v) setDeleteModalWorker(null);
            }}
          >
            <DialogContent>
              <div className="mb-4">
                Sei sicuro di voler eliminare il lavoratore{" "}
                <b>{deleteModalWorker?.username}</b>?
              </div>
              <Button
                variant="destructive"
                className="w-full mb-2"
                onClick={() =>
                  deleteModalWorker &&
                  deleteWorkerMutation.mutate(deleteModalWorker.documentId)
                }
                disabled={deleteWorkerMutation.isPending}
              >
                {deleteWorkerMutation.isPending
                  ? "Eliminazione..."
                  : "Conferma eliminazione"}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setDeleteModalWorker(null)}
              >
                Annulla
              </Button>
            </DialogContent>
          </Dialog>
          {/* Modale modifica worker */}
          <Dialog
            open={!!editModalWorker}
            onOpenChange={(v) => {
              if (!v) setEditModalWorker(null);
            }}
          >
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editModalWorker) {
                    updateWorkerMutation.mutate({
                      id: editModalWorker.documentId,
                      data: editWorkerData,
                    });
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    value={editWorkerData.username}
                    onChange={(e) =>
                      setEditWorkerData((w) => ({
                        ...w,
                        username: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editWorkerData.email}
                    onChange={(e) =>
                      setEditWorkerData((w) => ({
                        ...w,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={updateWorkerMutation.isPending}
                  className="w-full"
                >
                  {updateWorkerMutation.isPending ? "Salvataggio..." : "Salva"}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setEditModalWorker(null)}
                >
                  Annulla
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </Screen>
  );
};

export default WorkersPage;
