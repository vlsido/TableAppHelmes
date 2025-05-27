import type { Order } from "~/types/API";

export const ordersMock: Order[] = [
  {
    "orderNumber": "O1283823",
    "dueDate": "2024-12-27",
    "createdAt": "2024-12-20T12:23:43Z",
    "total": 10293.48,
    "status": "PAID"
  },
  {
    "orderNumber": "O1449379",
    "dueDate": "2024-12-20",
    "createdAt": "2024-12-15T14:12:25Z",
    "total": 683.34,
    "status": "UNPAID"
  },
  {
    "orderNumber": "O1774823",
    "dueDate": "2024-12-15",
    "createdAt": "2024-12-09T09:33:11Z",
    "total": 4329.84,
    "status": "UNPAID"
  },
  {
    "orderNumber": "O8392489",
    "dueDate": "2024-12-05",
    "createdAt": "2024-11-30T14:56:43Z",
    "total": 7392.43,
    "status": "PAID"
  },
  {
    "orderNumber": "O1183238",
    "dueDate": "2024-12-03",
    "createdAt": "2024-11-29T10:34:45.000Z",
    "total": 1023.32,
    "status": "PAID"
  }
];
