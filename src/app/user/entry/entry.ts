import {Category} from "../category/category";

export interface Entry {
  id: number;
  description: string;
  value: number;
  data: Date;
  isIncome: string;
  categories: Category[];
}
