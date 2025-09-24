import { create } from "zustand";
import { Tick, History } from "store/types";
import shallow from "utils/store";

interface TickerState {
  history: History | undefined;
  tickerDataLive: Record<string, Tick[]>;
  tickerData: Record<string, Tick[]>;
  addTicker: (val: Tick) => void;
  setHistory: (val: History) => void;
  startTickerPump: (ms?: number) => void;
  stopTickerPump: () => void;
  _pumpId?: number;
}

const useTickerStore = create<TickerState>((set, get) => ({
  history: undefined,
  tickerDataLive: {},
  tickerData: {},
  addTicker: val =>
    set(state => {
      const live = state.tickerDataLive;
      const prev = live[val.ticker] ?? [];
      const next = { ...live, [val.ticker]: [...prev, val] };
      return { tickerDataLive: next };
    }),
  setHistory: val => set(() => ({ history: val })),
  startTickerPump: (ms = 1200) => {
    const { _pumpId } = get();
    if (_pumpId) return;
    const pump = () => {
      const { tickerDataLive, tickerData } = get();
      if (tickerData !== tickerDataLive) {
        set({ tickerData: tickerDataLive });
      }
      const id = setTimeout(pump, ms);
      set({ _pumpId: id });
    };
    pump();
  },
  stopTickerPump: () => {
    const id = get()._pumpId;
    if (id) clearTimeout(id);
    set({ _pumpId: undefined });
  },
}));

export default shallow(useTickerStore);
