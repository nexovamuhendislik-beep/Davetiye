import { useMemo } from "react";

type FlowerParticle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  shape: string;
  color: string;
  peakOpacity: number;
};

const FLOWER_GLYPHS = ["✿", "❀", "✾", "❁"];
const FLOWER_COLORS = [
  "var(--color-blush)",
  "var(--color-petal)",
  "var(--color-orchid)",
  "var(--color-ice)",
  "var(--color-sky)",
  "var(--color-accent-deep)",
];

function createParticles(count: number): FlowerParticle[] {
  return Array.from({ length: count }, (_, id) => {
    const duration = 11 + Math.random() * 10;
    return {
      id,
      left: Math.random() * 100,
      size: 0.55 + Math.random() * 0.9,
      duration,
      delay: -(Math.random() * duration),
      drift: -40 + Math.random() * 80,
      spin: 120 + Math.random() * 360,
      shape: FLOWER_GLYPHS[Math.floor(Math.random() * FLOWER_GLYPHS.length)],
      color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
      peakOpacity: 0.28 + Math.random() * 0.5,
    };
  });
}

export function FallingFlowers() {
  const particles = useMemo(() => createParticles(88), []);

  return (
    <div className="falling-flowers pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="falling-flower falling-flower-glyph"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}rem`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            "--drift": `${particle.drift}px`,
            "--spin": `${particle.spin}deg`,
            "--peak-opacity": particle.peakOpacity,
            "--flower-color": particle.color,
          } as React.CSSProperties}
        >
          {particle.shape}
        </span>
      ))}
    </div>
  );
}
