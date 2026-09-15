import { describe, expect, it } from "vitest";
import { createCounter, incrementCounter } from "@/domain/entities/counter";

describe("counter", () => {
  it("将计数增加一", () => {
    expect(incrementCounter(createCounter(1))).toEqual({ value: 2 });
  });

  it("拒绝非安全整数", () => {
    expect(() => createCounter(Number.POSITIVE_INFINITY)).toThrow("计数值必须是安全整数");
  });
});
