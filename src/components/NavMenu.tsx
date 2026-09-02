import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#our-story', label: 'Our Story' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#agenda', label: "Day's Agenda" },
  { href: '#travel', label: 'Travel & Stay' },
  { href: '#details', label: 'Helpful Details' },
  { href: '#registry', label: 'Registry' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#rsvp', label: 'RSVP' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="fixed top-6 left-6 z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-gold-500/40 bg-ivory/80 backdrop-blur-sm shadow-sm"
      >
        <motion.span
          className="h-[1.5px] w-5 rounded-full bg-gold-700"
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease }}
        />
        <motion.span
          className="h-[1.5px] w-5 rounded-full bg-gold-700"
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="h-[1.5px] w-5 rounded-full bg-gold-700"
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              key="drawer"
              className="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col overflow-y-auto border-r border-gold-500/25 bg-ivory px-8 pb-10 pt-24 sm:w-[320px]"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="font-display text-2xl italic text-ink">Shweta &amp; Siddarth</p>
              <span className="mt-2 h-px w-16 bg-gold-500/50" />

              <ul className="mt-8 flex flex-col gap-1">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-2.5 font-sans text-sm tracking-[0.05em] text-ink/80 transition-colors hover:bg-gold-500/10 hover:text-gold-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
