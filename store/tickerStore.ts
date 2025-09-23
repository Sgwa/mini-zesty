import { create } from "zustand";
import { Tick, History } from "store/types";
import shallow from "utils/store";

interface ScrollState {
  history: History | undefined;
  tickerData: Tick[];
  addTicker: (val: Tick) => void;
  setHistory: (val: History) => void;
}

const useTickerStore = create<ScrollState>(set => ({
  history: undefined,
  tickerData: [],
  addTicker: val => set(state => ({ tickerData: [...state.tickerData, val] })),
  setHistory: val => set(() => ({ history: val })),
}));

export default shallow(useTickerStore);
