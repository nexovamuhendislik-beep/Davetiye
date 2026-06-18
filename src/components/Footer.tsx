import { couple } from "../config";

export function Footer() {
  return (
    <footer className="border-t border-petal/40 bg-cream/80 px-6 py-16 text-center backdrop-blur-sm">
      <p className="font-display text-2xl font-medium text-text italic">
        Sizi orada görmek dileğiyle!
      </p>
      <p className="mt-4 font-display text-4xl text-text">
        {couple.bride}
        <span className="mx-2 text-accent-deep italic">&</span>
        {couple.groom}
      </p>
    </footer>
  );
}
