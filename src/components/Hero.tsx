import { motion, type Variants } from 'framer-motion';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex flex-col items-center px-6 text-center"
    >
      <motion.p
        variants={item}
        className="font-sans text-xs tracking-[0.35em] uppercase text-leaf-700/80"
      >
        Together with their families
      </motion.p>

      <motion.h1
        variants={item}
        className="font-display mt-6 text-6xl italic text-ink sm:text-7xl md:text-8xl"
      >
        Shweta <span className="text-gold-600">&amp;</span> Siddarth
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-8 font-sans text-sm tracking-[0.25em] uppercase text-ink/70"
      >
        November 13&ndash;14, 2026 &middot; Harding Allen Estate &middot; Barre, Massachusetts
      </motion.p>

      <motion.a
        variants={item}
        href="#rsvp"
        className="mt-10 rounded-full border border-gold-500/60 px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase text-gold-700 transition-colors hover:bg-gold-500/10"
      >
        RSVP
      </motion.a>
    </motion.div>
  );
}
