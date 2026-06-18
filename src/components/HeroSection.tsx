import { couple, tagline } from "../config";
import { Butterfly } from "./Butterfly";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <Butterfly position="top" />

      <div className="hero-content hero-readable relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center text-text">
        <p className="animate-fade-up mb-4 text-sm font-semibold tracking-[0.32em] text-accent-deep uppercase">
          Davetlisiniz
        </p>
        <p
          className="hero-tagline animate-fade-up font-display text-3xl sm:text-4xl"
          style={{ animationDelay: "0.15s" }}
        >
          {tagline}
        </p>
        <h1
          className="animate-fade-up mt-4 font-display text-5xl font-medium tracking-wide sm:text-7xl"
          style={{ animationDelay: "0.3s" }}
        >
          {couple.bride}
          <span className="mx-3 text-accent-deep italic">&</span>
          {couple.groom}
        </h1>

        <div
          className="animate-fade-up mt-8 text-center text-text-muted"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-xs font-medium tracking-[0.28em] uppercase">Kaydır</p>
          <p className="mt-1">↓</p>
        </div>
      </div>

      <Butterfly position="bottom" />
    </section>
  );
}
