import { CounterCard } from "@/presentation/components/counter-card";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">create-ai-temp</p>
        <h1 id="page-title">从清晰的架构开始，与 AI 高效协作。</h1>
        <p className="description">
          项目已经配置 Next.js、Zustand、Biome 与测试工具，并将业务规则和界面实现分层管理。
        </p>
        <CounterCard />
      </section>
    </main>
  );
}
