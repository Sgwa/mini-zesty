import { UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { StoreApi } from "zustand/vanilla";

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;
type ReadonlyStoreApi<T> = Pick<
  StoreApi<T>,
  "getState" | "subscribe" | "getInitialState"
>;
type WithReact<S extends ReadonlyStoreApi<unknown>> = S;

const shallow = <T extends WithReact<ReadonlyStoreApi<unknown>>>(
  useStore: UseBoundStore<T>,
) => {
  return <R>(func: (state: ExtractState<T>) => R) => {
    return useStore(useShallow(func));
  };
};

export default shallow;
