import { tickerCompanyName } from "resources/constants";

export interface Position {
  symbol: keyof typeof tickerCompanyName;
  qty: number;
  avgPrice: number;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  updatedAt: number;
}
