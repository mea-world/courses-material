import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { UPC, UPCContainer } from "./types";

type UPCStore = {
  boxes: UPCContainer[];
  addBox: (id: string, UPCList: UPC[]) => void;
  removeBox: (id: string) => void;
  addUPCToBox: (params: { boxId: string; UPC: UPC }) => void;
  removeUPCFromBox: (params: { boxId: string; UPCKey: string }) => void;
  reset: () => void;
  updateUPCQuantity: (params: {
    boxId: string;
    UPCKey: string;
    quantity: number;
  }) => void;
};

export const useUPCStore = create<UPCStore>()(
  persist(
    (set) => ({
      boxes: [
        {
          id: "1",
          UPCList: [
            {
              key: "1234567890",
              quantity: 10,
            },
          ],
        },
      ],

      addBox: (id: string, UPCList: UPC[]) =>
        set(
          produce((state: UPCStore) => {
            state.boxes.push({ id, UPCList });
          })
        ),

      removeBox: (id: string) =>
        set(
          produce((state: UPCStore) => {
            state.boxes = state.boxes.filter((box) => box.id !== id);
          })
        ),

      addUPCToBox: (params: { boxId: string; UPC: UPC }) =>
        set(
          produce((state: UPCStore) => {
            const box = state.boxes.find((b) => b.id === params.boxId);
            if (box) {
              box.UPCList.push(params.UPC);
            }
          })
        ),

      removeUPCFromBox: (params: { boxId: string; UPCKey: string }) =>
        set(
          produce((state: UPCStore) => {
            const box = state.boxes.find((b) => b.id === params.boxId);
            if (box) {
              box.UPCList = box.UPCList.filter(
                (upc) => upc.key !== params.UPCKey
              );
            }
          })
        ),

      updateUPCQuantity: (params: {
        boxId: string;
        UPCKey: string;
        quantity: number;
      }) =>
        set(
          produce((state: UPCStore) => {
            const box = state.boxes.find((b) => b.id === params.boxId);
            if (box) {
              const upc = box.UPCList.find((u) => u.key === params.UPCKey);
              if (upc) {
                upc.quantity = params.quantity;
              }
            }
          })
        ),

      reset: () =>
        set(
          produce((state: UPCStore) => {
            state.boxes = [];
          })
        ),
    }),
    {
      name: "upc-storage",
    }
  )
);
