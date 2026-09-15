import { create } from "zustand";
import { createCounter, incrementCounter } from "@/domain/entities/counter";

interface CounterState {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: createCounter().value,
  increment: () => set(({ count }) => ({ count: incrementCounter(createCounter(count)).value })),
}));
