import { useEffect, useState, type CSSProperties } from "react";
import { publicAsset } from "../lib/publicAsset";

interface EnvelopeSceneProps {
  onOpen: () => void;
  onSealClick?: () => void;
}

type Phase = "idle" | "opening";

const flapBase: CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
};

/* Davetiye arka planı — VideoBackground ile aynı */
const invitationBase =
  "linear-gradient(160deg, var(--color-sky) 0%, var(--color-ice) 35%, var(--color-petal) 65%, var(--color-sky) 100%)";

const invitationRadials =
  "radial-gradient(circle at 12% 18%, rgba(255,200,221,0.7) 0%, transparent 42%), radial-gradient(circle at 88% 22%, rgba(205,180,219,0.55) 0%, transparent 40%), radial-gradient(circle at 50% 88%, rgba(189,224,254,0.65) 0%, transparent 45%)";

const flapSurface: CSSProperties = {
  backgroundImage: `${invitationRadials}, ${invitationBase}`,
  backgroundSize: "100% 100%",
};

const envelopeBackground = {
  backgroundImage: `${invitationRadials}, ${invitationBase}`,
  backgroundSize: "100% 100%",
};

type EdgePath = string;

function EnvelopeEdgeDefs() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <linearGradient id="env-edge-blue" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#a2d2ff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#bde0fe" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a2d2ff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="env-edge-blue-outer" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="100" y2="50">
          <stop offset="0%" stopColor="#8ec4f5" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#bde0fe" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#8ec4f5" stopOpacity="0.6" />
        </linearGradient>
        <filter id="env-edge-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function FlapEdges({ paths, outer = false }: { paths: EdgePath[]; outer?: boolean }) {
  const stroke = outer ? "url(#env-edge-blue-outer)" : "url(#env-edge-blue)";

  return (
    <svg
      className="env-flap-edges pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, index) => (
        <g key={index}>
          <path
            d={d}
            fill="none"
            stroke="#a2d2ff"
            strokeOpacity="0.28"
            strokeWidth="5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#env-edge-soft)"
          />
        </g>
      ))}
    </svg>
  );
}

/* Yumuşak kavisli katlama kenarları */
const flapEdgePaths = {
  top: {
    outer: ["M 0.5 1.5 Q 50 9 99.5 1.5"],
    crease: ["M 1.5 1.5 Q 27 31 50 50", "M 98.5 1.5 Q 73 31 50 50"],
  },
  right: {
    outer: ["M 98.5 0.5 Q 91 50 98.5 99.5"],
    crease: ["M 98.5 1.5 Q 74 29 50 50", "M 98.5 98.5 Q 74 71 50 50"],
  },
  bottom: {
    outer: ["M 0.5 98.5 Q 50 91 99.5 98.5"],
    crease: ["M 1.5 98.5 Q 27 69 50 50", "M 98.5 98.5 Q 73 69 50 50"],
  },
  left: {
    outer: ["M 1.5 0.5 Q 9 50 1.5 99.5"],
    crease: ["M 1.5 1.5 Q 26 29 50 50", "M 1.5 98.5 Q 26 71 50 50"],
  },
};

export function EnvelopeScene({ onOpen, onSealClick }: EnvelopeSceneProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const opening = phase === "opening";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (phase !== "idle") return;
    onSealClick?.();
    setPhase("opening");
    window.setTimeout(onOpen, 1400);
  };

  return (
    <div
      className={`env-scene fixed inset-0 z-[100] overflow-hidden ${opening ? "env-scene--opening" : ""}`}
      style={{ perspective: "1400px" }}
    >
      <EnvelopeEdgeDefs />

      <div className="env-scene-backdrop absolute inset-0">
        <div className="absolute inset-0" style={envelopeBackground} />
      </div>

      {/* Üst kapak — davetiye rengi + mavi kavisli kenarlar */}
      <div
        className={opening ? "env-flap-top-open" : ""}
        style={{
          ...flapBase,
          transformOrigin: "50% 0%",
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
          ...flapSurface,
          boxShadow: "none",
          zIndex: 4,
        }}
      >
        <FlapEdges paths={flapEdgePaths.top.outer} outer />
        <FlapEdges paths={flapEdgePaths.top.crease} />
      </div>

      {/* Sağ kapak */}
      <div
        className={opening ? "env-flap-right-open" : ""}
        style={{
          ...flapBase,
          transformOrigin: "100% 50%",
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
          ...flapSurface,
          boxShadow: "none",
          zIndex: 3,
        }}
      >
        <FlapEdges paths={flapEdgePaths.right.outer} outer />
        <FlapEdges paths={flapEdgePaths.right.crease} />
      </div>

      {/* Alt kapak */}
      <div
        className={opening ? "env-flap-bottom-open" : ""}
        style={{
          ...flapBase,
          transformOrigin: "50% 100%",
          clipPath: "polygon(100% 100%, 0 100%, 50% 50%)",
          ...flapSurface,
          boxShadow: "none",
          zIndex: 2,
        }}
      >
        <FlapEdges paths={flapEdgePaths.bottom.outer} outer />
        <FlapEdges paths={flapEdgePaths.bottom.crease} />
      </div>

      {/* Sol kapak */}
      <div
        className={opening ? "env-flap-left-open" : ""}
        style={{
          ...flapBase,
          transformOrigin: "0% 50%",
          clipPath: "polygon(0 100%, 0 0, 50% 50%)",
          ...flapSurface,
          boxShadow: "none",
          zIndex: 3,
        }}
      >
        <FlapEdges paths={flapEdgePaths.left.outer} outer />
        <FlapEdges paths={flapEdgePaths.left.crease} />
      </div>

      {/* Mühür */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={open}
          disabled={opening}
          className={`env-seal-btn pointer-events-auto translate-y-4 transition-transform duration-200 hover:scale-105 active:scale-95 sm:translate-y-5 ${opening ? "env-seal-break" : ""}`}
          aria-label="Davetiyeyi aç"
        >
          <img
            src={publicAsset("muhur.png")}
            alt="Mühür"
            className="env-seal-img"
            draggable={false}
          />
        </button>

        {!opening && (
          <p className="mt-16 animate-pulse-hint font-display text-xl text-text italic sm:mt-20 sm:text-2xl">
            Mühre dokunun
          </p>
        )}
      </div>
    </div>
  );
}
