import { DayData, History } from "store/types";
import { Position } from "services/types/portfolio";

const toTime = (s: string) => new Date(s).getTime();

export const buildPortfolioDayData = (
  history: History["data"],
  positions: Position[],
) => {
  if (!positions.length) return { market: [], invested: [] };

  const dateSet = new Set<string>(
    positions.flatMap(p => (history[p.symbol] ?? []).map(dayData => dayData.date)),
  );
  const dates = [...dateSet].sort((a, b) => toTime(a) - toTime(b));

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

  const positionsBySymbol = new Map<string, Position[]>();
  for (const position of positions) {
    const list = positionsBySymbol.get(position.symbol) ?? [];
    list.push(position);
    positionsBySymbol.set(position.symbol, list);
  }
  for (const [symbol, list] of positionsBySymbol) {
    list.sort((a, b) => toTime(a.date) - toTime(b.date));
    positionsBySymbol.set(symbol, list);
  }

  const lastCloseBySymbol = new Map<string, number>();
  const market: DayData[] = [];
  const invested: DayData[] = [];

  const positionsIndexBySymbol = new Map<string, number>();
  const cumulativeQtyBySymbol = new Map<string, number>();
  const cumulativeInvestedBySymbol = new Map<string, number>();

  for (const date of dates) {
    let marketOpen = 0,
      marketHigh = 0,
      marketLow = 0,
      marketClose = 0;

    let investedAmount = 0;

    for (const [symbol, positions] of positionsBySymbol) {
      let posIdx = positionsIndexBySymbol.get(symbol) ?? -1;
      let cumulativeQty = cumulativeQtyBySymbol.get(symbol) ?? 0;
      let cumulativeInvested = cumulativeInvestedBySymbol.get(symbol) ?? 0;

      while (
        posIdx + 1 < positions.length &&
        toTime(positions[posIdx + 1].date) <= toTime(date)
      ) {
        posIdx += 1;
        const position = positions[posIdx];
        cumulativeQty += position.qty;
        cumulativeInvested += position.qty * position.buyPrice;
      }
      positionsIndexBySymbol.set(symbol, posIdx);
      cumulativeQtyBySymbol.set(symbol, cumulativeQty);
      cumulativeInvestedBySymbol.set(symbol, cumulativeInvested);

      if (cumulativeQty !== 0) {
        investedAmount += cumulativeInvested;
      }

      if (cumulativeQty === 0) continue;

      const dateMap = mapBySymbol.get(symbol);
      const day = dateMap?.get(date);

      if (day) {
        marketOpen += cumulativeQty * day.open;
        marketHigh += cumulativeQty * day.high;
        marketLow += cumulativeQty * day.low;
        marketClose += cumulativeQty * day.close;
        lastCloseBySymbol.set(symbol, day.close);
      } else {
        const lastClose = lastCloseBySymbol.get(symbol);
        if (lastClose != null) {
          marketOpen += cumulativeQty * lastClose;
          marketHigh += cumulativeQty * lastClose;
          marketLow += cumulativeQty * lastClose;
          marketClose += cumulativeQty * lastClose;
        }
      }
    }

    market.push({
      date,
      open: marketOpen,
      high: marketHigh,
      low: marketLow,
      close: marketClose,
    });
    invested.push({
      date,
      open: investedAmount,
      high: investedAmount,
      low: investedAmount,
      close: investedAmount,
    });
  }

  return { market, invested };
};
