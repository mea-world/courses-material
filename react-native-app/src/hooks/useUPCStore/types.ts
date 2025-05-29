export type UPC = {
  key: string;
  quantity: number;
};

export type Carton = {
  id: string;
  UPCList: UPC[];
};
