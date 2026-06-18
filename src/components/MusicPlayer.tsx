import { useEffect, useRef, useState } from "react";
import { musicSrc } from "../config";
import { publicAsset } from "../lib/publicAsset";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = musicSrc ? publicAsset(musicSrc) : "";

  useEffect(() => {
    if (!autoPlay || !src) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, [autoPlay, src]);

  if (!src) return null;

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
      <audio ref={audioRef} src={src} loop preload="auto" />
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
