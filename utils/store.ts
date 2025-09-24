import type { StoreApi } from "zustand/vanilla";
import type { UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type ShallowBoundStore<T> = (<R>(selector: (s: T) => R) => R) &
  UseBoundStore<StoreApi<T>>;

export default function shallow<T>(
  useStore: UseBoundStore<StoreApi<T>>,
): ShallowBoundStore<T> {
  const wrapped = (<R>(selector: (s: T) => R) =>
    useStore(useShallow(selector))) as ShallowBoundStore<T>;
  return Object.assign(wrapped, useStore);
}
