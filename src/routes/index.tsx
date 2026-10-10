import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { BellRing, Radar, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線 (Always-on route watching)", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知 (Target-price email alerts)", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: XCircle, title: "隨時取消 (Cancel anytime)", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Landing() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        right={
          <Button asChild>
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        }
      />
      <main className="flex-1">
        <section className="bg-hero">
          <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
            <p className="animate-fade-up mb-6 inline-block rounded-full border border-border bg-card/60 px-4 py-1 text-xs text-muted-foreground">
              TPE → NRT · HND · ICN
            </p>
            <h1 className="animate-fade-up text-gradient text-5xl font-bold tracking-tight sm:text-7xl">
              Flight Price Notifier
            </h1>
            <p className="animate-fade-up mt-6 text-xl font-medium sm:text-2xl [animation-delay:120ms]">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-up mt-3 text-muted-foreground [animation-delay:200ms]">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up mt-10 [animation-delay:280ms]">
              <Button asChild size="lg" className="shadow-glow">
                <Link to="/signup">Get started / 免費註冊</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
