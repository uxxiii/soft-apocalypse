import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/patrons', label: 'Patrons' },
  { to: '/judges', label: 'Judges' },
  { to: '/rewards', label: 'Awards' },
  { to: '/submission', label: 'Submission & Guidelines' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActiveRoute = (to) =>
    location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className={`relative overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? 'border-white/70 bg-rain-mist/76 shadow-[0_18px_60px_-36px_rgba(23,34,52,0.55)]'
                : 'border-white/45 bg-rain-mist/55 shadow-[0_18px_60px_-42px_rgba(23,34,52,0.42)]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(44,74,110,0.12),transparent_30%)]" />

            <div className="relative flex h-16 items-center justify-between px-5 sm:h-[4.65rem] sm:px-6">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-2 sm:gap-3"
                aria-label="Soft Apocalypse - Home"
              >
                <img
                  src="/images/moth-logo.png"
                  alt="Soft Apocalypse moth logo"
                  className="h-8 w-auto opacity-85 sm:h-10"
                />
                <div>
                  <span className="block font-heading text-base sm:text-2xl leading-none text-storm-slate">
                    Soft Apocalypse
                  </span>
                  <span className="mt-0.5 block font-body text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.26em] sm:tracking-[0.34em] text-storm-slate/55">
                    National anthology 2026
                  </span>
                </div>
              </Link>

              <div className="hidden items-center gap-2 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`group relative overflow-hidden rounded-full px-4 py-2 text-[0.73rem] font-semibold uppercase tracking-[0.26em] transition-colors duration-300 ${
                      isActiveRoute(link.to)
                        ? 'text-rain-mist'
                        : 'text-deep-ink/72 hover:text-deep-ink'
                    }`}
                  >
                    {isActiveRoute(link.to) && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-storm-slate shadow-[0_12px_40px_-30px_rgba(23,34,52,0.8)]"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-warm-sand/90 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                ))}

                <Link
                  to="/submission"
                  className="ml-2 inline-flex items-center gap-2 rounded-full border border-storm-slate/12 bg-white/70 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-storm-slate transition-all duration-300 hover:border-warm-sand/40 hover:bg-white hover:shadow-[0_18px_40px_-30px_rgba(196,168,130,0.9)]"
                >
                  Submit
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <button
                className="rounded-full border border-storm-slate/10 bg-white/60 p-3 text-storm-slate transition-all duration-300 hover:border-warm-sand/50 hover:bg-white lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-40 bg-deep-ink/45 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-5 z-50 overflow-hidden rounded-[2rem] border border-white/12 bg-deep-ink/92 text-rain-mist shadow-[0_34px_100px_-50px_rgba(0,0,0,0.95)] sm:inset-x-6"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

              <div className="relative px-6 pb-8 pt-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-body text-[0.68rem] uppercase tracking-[0.36em] text-warm-sand/80">
                      Soft Apocalypse 2026
                    </p>
                    <h2 className="mt-3 max-w-xs font-heading text-4xl leading-none text-rain-mist">
                      An anthology for the next literary generation.
                    </h2>
                  </div>

                  <button
                    className="rounded-full border border-white/15 bg-white/6 p-3 text-rain-mist transition-colors duration-300 hover:border-warm-sand/50 hover:text-warm-sand"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="mt-10 flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3, ease: 'easeOut' }}
                    >
                      <Link
                        to={link.to}
                        className={`group flex items-center justify-between rounded-[1.4rem] border px-5 py-4 transition-all duration-300 ${
                          isActiveRoute(link.to)
                            ? 'border-warm-sand/30 bg-white/10 text-warm-sand'
                            : 'border-white/10 bg-white/4 text-rain-mist hover:border-white/20 hover:bg-white/8'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div>
                          <span className="block font-heading text-[1.95rem] leading-none">
                            {link.label}
                          </span>
                          <span className="mt-2 block font-body text-[0.68rem] uppercase tracking-[0.32em] text-rain-mist/55 group-hover:text-rain-mist/70">
                            Section {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-rain-mist/70 transition-all duration-300 group-hover:border-warm-sand/45 group-hover:text-warm-sand">
                          <ArrowUpRight size={16} />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-24 sm:h-28" />
    </>
  );
}
