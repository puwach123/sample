export type User = {
  id: number;
  name: string;
  password: string;
};

export type Role = {
  id: number;
  subject: string;
  action: string;
  object: string;
};
