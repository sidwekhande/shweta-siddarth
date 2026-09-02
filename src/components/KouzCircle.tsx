import { useEffect, useRef } from 'react';
import * as LottieModule from 'lottie-react';
import animationData from '../assets/kouz-circle.json';

// lottie-react's UMD build double-wraps its default export under both
// esbuild (dev) and Rollup (build), so `import Lottie from 'lottie-react'`
// resolves to an object instead of the component. Unwrap it defensively.
const importedDefault = (LottieModule as unknown as { default: unknown }).default;
const Lottie = (
  importedDefault && typeof importedDefault === 'object' && 'default' in importedDefault
    ? (importedDefault as { default: unknown }).default
    : importedDefault
) as typeof LottieModule.default;

export default function KouzCircle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieModule.LottieRefCurrentProps>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          lottieRef.current?.play();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="h-full w-full"
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
      />
    </div>
  );
}
