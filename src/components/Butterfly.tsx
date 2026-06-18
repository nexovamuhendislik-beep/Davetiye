interface ButterflyProps {
  position?: "top" | "bottom";
}

export function Butterfly({ position = "top" }: ButterflyProps) {
  const isBottom = position === "bottom";

  return (
    <div
      className={`hero-butterfly-wrap animate-butterfly pointer-events-none absolute z-10 ${
        isBottom ? "hero-butterfly-wrap--bottom" : "hero-butterfly-wrap--top"
      }`}
      style={isBottom ? { animationDelay: "0.35s" } : undefined}
    >
      <div className={isBottom ? "hero-butterfly-flip" : "h-full w-full"}>
        <img
          src="/kelebek.png"
          alt=""
          aria-hidden="true"
          className="hero-butterfly-img"
          draggable={false}
        />
      </div>
    </div>
  );
}
