import S from "../i18n";

export const tickerCompanyName = {
  AAPL: "Apple Inc",
  NVDA: "NVIDIA Corporation",
  TSLA: "Tesla, Inc",
  AMZN: "Amazon.com, Inc",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc",
  META: "Meta Platforms, Inc",
  AMD: "Advanced Micro Devices, Inc",
  IBM: "International Business Machines Corporation",
  ORCL: "Oracle Corporation",
  SNAP: "Snap Inc",
  SHOP: "Shopify Inc",
  UBER: "Uber Technologies, Inc",
  COIN: "Coinbase Global, Inc",
  ABNB: "Airbnb, Inc",
  DIS: "The Walt Disney Company",
  NFLX: "Netflix, Inc",
  INTC: "Intel Corporation",
  BA: "The Boeing Company",
  JNJ: "Johnson & Johnson",
} as const;

export enum SortBy {
  PERCENTAGE = "percentage",
  PORTFOLIO = "portfolio",
  PRICE = "price",
  PNL = "p&l",
}

export const sortByText: Record<SortBy, string> = {
  [SortBy.PNL]: S.filter.pl,
  [SortBy.PERCENTAGE]: S.filter.percentage,
  [SortBy.PRICE]: S.filter.price,
  [SortBy.PORTFOLIO]: S.filter.portfolio,
};

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
