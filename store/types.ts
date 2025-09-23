export interface Tick {
  type: "tick";
  ticker: string;
  price: number;
  ts: number;
}

interface DayData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface History {
  type: "history";
  range: string;
  data: Record<string, DayData[]>;
}
