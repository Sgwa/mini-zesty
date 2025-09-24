import { DayData, History } from "store/types";
import { Position } from "services/types/portfolio";

export const buildPortfolioDayData = (
  history: History["data"],
  positions: Position[],
): DayData[] => {
  if (!positions.length) return [];

  const dateSet = new Set<string>(
    positions.flatMap(p => (history[p.symbol] ?? []).map(dayData => dayData.date)),
  );
  const dates = [...dateSet].sort((a, b) => +new Date(a) - +new Date(b));

  const mapBySymbol = new Map<string, Map<string, DayData>>(
    positions.map(({ symbol }) => [
      symbol,
      new Map<string, DayData>(
        (history[symbol] ?? []).map(
          dayData => [dayData.date, dayData] as [string, DayData],
        ),
      ),
    ]),
  );

  const lastCloseBySymbol = new Map<string, number>();
  const dayDataList: DayData[] = [];

  for (const date of dates) {
    let sumOpen = 0;
    let sumHigh = 0;
    let sumLow = 0;
    let sumClose = 0;

    for (const { symbol, qty } of positions) {
      const datesData = mapBySymbol.get(symbol)!;
      const dayData = datesData.get(date);
      if (dayData) {
        sumOpen += qty * dayData.open;
        sumHigh += qty * dayData.high;
        sumLow += qty * dayData.low;
        sumClose += qty * dayData.close;
        lastCloseBySymbol.set(symbol, dayData.close);
      } else {
        const lastClose = lastCloseBySymbol.get(symbol);
        if (lastClose != null) {
          sumOpen += qty * lastClose;
          sumHigh += qty * lastClose;
          sumLow += qty * lastClose;
          sumClose += qty * lastClose;
        }
      }
    }

    dayDataList.push({
      date,
      open: sumOpen,
      high: sumHigh,
      low: sumLow,
      close: sumClose,
    });
  }

  return dayDataList;
};
