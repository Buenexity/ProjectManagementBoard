// ticket.model.ts

export const STATUSES = ['backlog', 'in progress', 'review', 'done'];

export const CATEGORIES = ['feature', 'bug', 'r&d'];

export type Status = (typeof STATUSES)[number];
export type Category = (typeof CATEGORIES)[number];

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: Status;
  category: Category;
}
