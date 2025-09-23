import { create } from "zustand";
import { Tick, History } from "store/types";
import shallow from "utils/store";

interface ScrollState {
  history: History | undefined;
  tickerData: Record<string, Tick[]> | undefined;
  addTicker: (val: Tick) => void;
  setHistory: (val: History) => void;
}

const useTickerStore = create<ScrollState>(set => ({
  history: undefined,
  tickerData: undefined,
  addTicker: val =>
    set(state => {
      const data = state.tickerData ? { ...state.tickerData } : {};
      const prev = data[val.ticker] ?? [];
      data[val.ticker] = [...prev, val];
      return { tickerData: data };
    }),
  setHistory: val => set(() => ({ history: val })),
}));

export default shallow(useTickerStore);
