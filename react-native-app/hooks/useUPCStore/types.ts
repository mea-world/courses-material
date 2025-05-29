export type UPC = {
  key: string;
  quantity: number;
};

export type UPCContainer = {
  id: string;
  UPCList: UPC[];
};
