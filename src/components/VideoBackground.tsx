import { videoSrc } from "../config";

export function VideoBackground() {
  if (videoSrc) {
    return (
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src={videoSrc}
        />
        <div className="absolute inset-0 bg-orchid/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, var(--color-sky) 0%, var(--color-ice) 35%, var(--color-petal) 65%, var(--color-sky) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(255,200,221,0.7) 0%, transparent 42%), radial-gradient(circle at 88% 22%, rgba(205,180,219,0.55) 0%, transparent 40%), radial-gradient(circle at 50% 88%, rgba(189,224,254,0.65) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
