import { InternalAxiosRequestConfig } from "axios";
import useTickerStore from "store/tickerStore";
import { History } from "store/types";

interface Props {
  config: InternalAxiosRequestConfig;
}

const getRandom = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const range = (end: number, step: number = 1): number[] => {
  const start = 0;
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

export function waitForHistory(opts?: {
  timeoutMs?: number;
}): Promise<NonNullable<History>> {
  const { timeoutMs = 5000 } = opts ?? {};

  return new Promise<NonNullable<History>>((resolve, reject) => {
    const current = useTickerStore.getState().history;
    if (current) return resolve(current);

    const unsub = useTickerStore.subscribe((state, prev) => {
      if (!prev?.history && state.history) {
        unsub();
        clearTimeout(timer);
        resolve(state.history);
      }
    });

    const timer = setTimeout(() => {
      unsub();
      reject(new Error("Timed out waiting for history"));
    }, timeoutMs);
  });
}

let _once: Promise<{
  data: {
    cash: number;
    positions: { symbol: string; qty: number; date: string; buyPrice: number }[];
    updatedAt: number;
  };
}> | null = null;

async function build() {
  const history = await waitForHistory({ timeoutMs: 8000 });

  const symbols = range(5)
    .map(() => getRandom(Object.keys(history.data || {})))
    .filter(symbol => symbol !== undefined);

  const positions = symbols
    .flatMap(symbol => {
      return range(2).map(() => {
        const dayData = getRandom(history.data[symbol] || []);
        return {
          symbol,
          qty: getRandomNumber(0, 5),
          date: dayData?.date ?? "",
          buyPrice: dayData ? getRandomNumber(dayData.low ?? 0, dayData.high ?? 0) : 0,
        };
      });
    })
    .filter(p => p.date !== "");

  return {
    data: {
      cash: 1500,
      positions,
      updatedAt: Date.now(),
    },
  } as const;
}

export const portfolioMockData = async ({ config }: Props) => {
  const payload = await (_once ??= build());

  return {
    ...payload,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  } as const;
};
