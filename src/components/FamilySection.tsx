import { families } from "../config";

function FamilyCard({
  label,
  members,
}: {
  label: string;
  members: string[];
}) {
  return (
    <div className="family-card rounded-2xl border border-orchid/35 bg-ivory/70 px-6 py-8 text-center shadow-[0_8px_28px_color-mix(in_srgb,var(--color-orchid)_12%,transparent)] backdrop-blur-sm">
      <p className="text-xs font-semibold tracking-[0.28em] text-accent-deep uppercase">
        {label}
      </p>
      <p className="mt-4 font-display text-2xl leading-relaxed text-text sm:text-3xl">
        {members.map((name, index) => (
          <span key={name}>
            {index > 0 && (
              <span className="mx-2 text-accent-deep italic">&</span>
            )}
            {name}
          </span>
        ))}
      </p>
    </div>
  );
}

export function FamilySection() {
  return (
    <section className="px-6 py-14 text-text sm:py-16">
      <p className="section-sub">Ailelerimiz</p>
      <h2 className="section-title mt-2 text-text">Gelin & Damat Ailesi</h2>
      <div className="ornament">✦</div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2 sm:gap-6">
        <FamilyCard label={families.bride.label} members={families.bride.members} />
        <FamilyCard label={families.groom.label} members={families.groom.members} />
      </div>
    </section>
  );
}
