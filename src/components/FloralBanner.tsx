import * as LottieModule from 'lottie-react';
import animationData from '../assets/weddingfloral.json';

// lottie-react's UMD build double-wraps its default export under both
// esbuild (dev) and Rollup (build), so `import Lottie from 'lottie-react'`
// resolves to an object instead of the component. Unwrap it defensively.
const importedDefault = (LottieModule as unknown as { default: unknown }).default;
const Lottie = (
  importedDefault && typeof importedDefault === 'object' && 'default' in importedDefault
    ? (importedDefault as { default: unknown }).default
    : importedDefault
) as typeof LottieModule.default;

export default function FloralBanner() {
  return (
    <Lottie
      animationData={animationData}
      loop={false}
      autoplay
      className="h-full w-full"
      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
    />
  );
}
