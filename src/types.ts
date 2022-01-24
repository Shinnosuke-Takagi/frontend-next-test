export type User = {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Folder = {
  id: number;
  author: User;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: number;
  folder: Folder;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
