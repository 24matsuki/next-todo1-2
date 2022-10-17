export type TodoItem = {
  id: string;
  title: string;
  detail: string;
  status: string;
  createdAt: any;
  updatedAt: any;
  uid: string;
};

export type User = {
  uid: string;
  email: string;
};

export type TodoFormValues = {
  title: string;
  detail: string;
  status: string;
};

export type AuthFormValues = {
  email: string;
  password: string;
};

export type StatusValues = "all" | "notStarted" | "inProgress" | "finished";
