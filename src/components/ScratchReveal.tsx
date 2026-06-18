import { useEffect, useRef, useState } from "react";
import type { EventDetails } from "../config";

interface ScratchRevealProps {
  event: EventDetails;
}

function paintScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#FFAFCC");
  gradient.addColorStop(0.45, "#CDB4DB");
  gradient.addColorStop(1, "#A2D2FF");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function ScratchReveal({ event }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.globalCompositeOperation = "source-over";
      paintScratchLayer(ctx, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";
    };

    resize();
    window.addEventListener("resize", resize);

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: PointerEvent) => {
      drawing.current = true;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const onMove = (e: PointerEvent) => {
      if (!drawing.current) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const onUp = () => {
      drawing.current = false;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      if (cleared / (data.length / 4) > 0.35) setRevealed(true);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onUp);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <div className="px-5 py-8">
      <p className="section-sub">Tarih</p>
      <h2 className="section-title mt-2">{event.label}</h2>
      <p className="scratch-hint mt-2 text-center text-sm uppercase">
        ✦ Kazıyarak tarihi görün ✦
      </p>

      <div
        ref={containerRef}
        className="scratch-card relative mx-auto mt-6 h-56 max-w-sm overflow-hidden rounded-xl"
      >
        <div className="scratch-card-inner absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-end gap-5">
            <div>
              <p className="font-display text-6xl font-medium text-text">{event.day}</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
                Gün
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-medium text-accent-deep">
                {event.month}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
                Ay
              </p>
            </div>
            <div>
              <p className="font-display text-5xl font-medium text-text">{event.year}</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
                Yıl
              </p>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 touch-none transition-opacity duration-500 ${revealed ? "pointer-events-none opacity-0" : "cursor-crosshair"}`}
        />
      </div>
    </div>
  );
}
