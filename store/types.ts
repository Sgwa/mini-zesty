export enum Ticker {
  AAPL = "AAPL",
  NVDA = "NVDA",
  TSLA = "TSLA",
  AMZN = "AMZN",
  MSFT = "MSFT",
  GOOGL = "GOOGL",
  META = "META",
  AMD = "AMD",
  IBM = "IBM",
  ORCL = "ORCL",
  SNAP = "SNAP",
  SHOP = "SHOP",
  UBER = "UBER",
  COIN = "COIN",
  ABNB = "ABNB",
  DIS = "DIS",
  NFLX = "NFLX",
  INTC = "INTC",
  BA = "BA",
  JNJ = "JNJ",
}

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
  data: Record<Ticker, DayData[]>;
}
