import { useEffect, useState } from 'react';

const TARGET = new Date('2026-11-13T16:00:00-05:00').getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export default function Countdown() {
  // Computed client-side only, after mount — this is a statically-built site,
  // so a value baked in at build time would otherwise flash stale numbers
  // until hydration catches up.
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const values = remaining
    ? [remaining.days, remaining.hours, remaining.minutes, remaining.seconds]
    : ['--', '--', '--', '--'];

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {UNITS.map((unit, i) => (
          <div
            key={unit}
            className="flex flex-col items-center rounded-2xl border border-gold-500/25 bg-ivory/70 px-2 py-5 sm:px-4 sm:py-7"
          >
            <span className="font-display text-3xl text-gold-700 sm:text-5xl">
              {typeof values[i] === 'number' ? String(values[i]).padStart(2, '0') : values[i]}
            </span>
            <span className="mt-1 font-sans text-[10px] tracking-[0.2em] uppercase text-ink/60 sm:text-xs">
              {unit}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-sans text-[11px] tracking-[0.15em] uppercase text-ink/50">
        Until 4:00 PM, Friday Nov 13 (Eastern Time)
      </p>
    </div>
  );
}
