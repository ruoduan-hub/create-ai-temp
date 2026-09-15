"use client";

import { useCounterStore } from "@/presentation/stores/use-counter-store";

export function CounterCard() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <section className="counter-card" aria-labelledby="counter-title">
      <div>
        <span id="counter-title">分层状态示例</span>
        <p className="counter-value" aria-live="polite">
          {count}
        </p>
      </div>
      <button className="counter-button" type="button" onClick={increment}>
        增加计数
      </button>
    </section>
  );
}
