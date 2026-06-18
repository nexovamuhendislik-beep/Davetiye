import { useEffect, useState } from "react";
import { countdownTarget } from "../config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function calcTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    finished: false,
  };
}

const units = [
  { key: "days", label: "Gün" },
  { key: "hours", label: "Saat" },
  { key: "minutes", label: "Dakika" },
  { key: "seconds", label: "Saniye" },
] as const;

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(countdownTarget));

  useEffect(() => {
    const tick = () => setTimeLeft(calcTimeLeft(countdownTarget));
    tick();
    const timer = window.setInterval(tick, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section px-6 pb-20 pt-2 text-center text-text" aria-live="polite">
      {timeLeft.finished ? (
        <p className="font-display text-2xl font-medium text-accent-deep italic sm:text-3xl">
          Mutluluklar dileriz!
        </p>
      ) : (
        <div className="countdown-grid mx-auto max-w-2xl">
          {units.map(({ key, label }) => {
            const value = timeLeft[key];
            const display = key === "days" ? String(value) : String(value).padStart(2, "0");

            return (
              <div key={key} className="countdown-unit">
                <span className="countdown-value font-display">{display}</span>
                <span className="countdown-label">{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
