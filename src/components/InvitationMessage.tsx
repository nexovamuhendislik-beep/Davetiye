import { invitationLetter } from "../config";

export function InvitationMessage() {
  return (
    <section className="px-6 py-16 text-center text-text">
      <p className="section-sub">Mesajımız</p>
      <h2 className="section-title mt-2 text-text">Sizleri Bekliyoruz</h2>
      <div className="ornament">✦</div>
      <p className="mx-auto mt-6 max-w-md font-display text-xl font-medium text-accent-deep italic">
        {invitationLetter.greeting}
      </p>
      <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-muted">
        {invitationLetter.body}
      </p>
    </section>
  );
}
