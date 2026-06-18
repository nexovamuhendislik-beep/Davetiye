import type { EventDetails } from "../config";

interface ScheduleSectionProps {
  event: EventDetails;
}

export function ScheduleSection({ event }: ScheduleSectionProps) {
  return (
    <section className="px-6 py-16 text-text">
      <p className="section-sub">Program</p>
      <h2 className="section-title mt-2 text-text">
        {event.label} — Etkinlik Akışı
      </h2>
      <div className="ornament">✦</div>

      <div className="schedule-timeline relative mx-auto mt-10 max-w-xl">
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-orchid/35"
          aria-hidden
        />

        <ul className="space-y-10 sm:space-y-12">
          {event.schedule.map((item, i) => {
            const isLeft = i % 2 === 0;

            return (
              <li key={i} className="relative">
                <div
                  className={`w-[calc(50%-0.75rem)] sm:w-[calc(50%-1rem)] ${
                    isLeft
                      ? "mr-auto pr-4 text-right sm:pr-8"
                      : "ml-auto pl-4 text-left sm:pl-8"
                  }`}
                >
                  <p className="font-display text-xl font-medium text-text sm:text-3xl">
                    {item.label}
                  </p>
                  <time className="mt-1.5 block text-base font-semibold tracking-[0.22em] text-accent-deep sm:text-lg">
                    {item.time}
                  </time>
                </div>

                <div
                  className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orchid bg-ivory shadow-sm"
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
