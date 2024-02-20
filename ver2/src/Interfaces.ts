export interface Product {
  id: number;
  name: string;
  options: {
    size: string;
    amount: number;
  };
  active: boolean;
  createdAt: string;
}

export interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (record: T) => JSX.Element | string;
}
