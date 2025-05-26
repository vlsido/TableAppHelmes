export type Order = {
  orderNumber: number;
  dueDate: string;
  createdAt: string;
  total: number;
  status: "PAID" | "UNPAID";
}
