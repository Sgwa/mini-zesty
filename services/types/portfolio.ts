import { tickerCompanyName } from "resources/constants";

export interface Position {
  symbol: keyof typeof tickerCompanyName;
  qty: number;
  buyPrice: number;
  date: string;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  updatedAt: number;
}
