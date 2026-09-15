export interface Counter {
  readonly value: number;
}

export function createCounter(value = 0): Counter {
  if (!Number.isSafeInteger(value)) throw new Error("计数值必须是安全整数");
  return { value };
}

export function incrementCounter(counter: Counter): Counter {
  return createCounter(counter.value + 1);
}
