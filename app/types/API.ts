export type Order = {
  orderNumber: string;
  dueDate: string;
  createdAt: string;
  total: number;
  status: "PAID" | "UNPAID";
}
