export interface MyEvent {
  address: {
    name: string,
    description: string
  };
  coordinates: [number, number];
  createdAt: Date;
  description: string;
  pluses: string[];
  reports: string[];
  time: number;
  type: string;
  userId: string;
  name: string;
  _id: string;
}

export interface User {
  _id: string
  email: string,
  name: string,
  avatar: string,
}