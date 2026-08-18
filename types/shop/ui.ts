export type UiShopItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  coverGradient: string;
};

export type UiPointLog = {
  id: string;
  label: string;
  amount: number;
  createdAt: string;
};

export type UiRefundRequest = {
  id: string;
  itemName: string;
  amount: number;
  status: "available" | "pending" | "done";
};
