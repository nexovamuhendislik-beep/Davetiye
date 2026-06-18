import { useEffect, useRef, useState } from "react";
import { musicSrc } from "../config";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoPlay || !musicSrc) return;
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, [autoPlay]);

  if (!musicSrc) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Müziği durdur" : "Müziği başlat"}
        className="fixed right-4 bottom-4 z-50 flex size-11 items-center justify-center rounded-full border border-orchid/40 bg-ivory/90 text-blush shadow-lg backdrop-blur-sm"
      >
        {playing ? "⏸" : "♪"}
      </button>
    </>
  );
}
