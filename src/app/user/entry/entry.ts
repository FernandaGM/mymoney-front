import {Category} from "../category/category";

export interface Entry {
  id: number;
  description: string;
  value: number;
  createdAt: Date;
  isIncome: string;
  categories: Category[];
}
