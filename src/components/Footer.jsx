import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail } from 'lucide-react';

const footerLinks = [
  { to: '/patrons', label: 'Patrons' },
  { to: '/judges', label: 'Judges' },
  { to: '/submission', label: 'Submission' },
  { to: '/contact', label: 'Contact' },
];
const INSTAGRAM_URL = 'https://instagram.com/softapocalypse.in';

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/40 bg-deep-ink text-rain-mist" role="contentinfo">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,168,130,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="max-w-xl">
            <Link to="/" aria-label="Home" className="inline-flex items-center gap-4">
              <img
                src="/images/moth-logo.png"
                alt="Soft Apocalypse moth logo"
                className="h-12 w-auto brightness-0 invert opacity-75"
              />
              <div>
                <span className="block font-heading text-3xl leading-none text-rain-mist">
                  Soft Apocalypse
                </span>
                <span className="mt-1 block font-body text-[0.66rem] uppercase tracking-[0.36em] text-rain-mist/45">
                  Editorial anthology 2026
                </span>
              </div>
            </Link>

            <p className="mt-8 max-w-lg font-body text-sm leading-7 text-rain-mist/68 sm:text-base">
              A carefully curated anthology for writers under twenty-five across India,
              designed to feel archival, contemporary, and alive on the page.
            </p>

            <p className="mt-8 font-heading text-2xl italic leading-none text-warm-sand">
              200 voices. One book.
            </p>
          </div>

          <div>
            <p className="font-body text-[0.68rem] uppercase tracking-[0.36em] text-rain-mist/45">
              Explore
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-heading text-2xl leading-none text-rain-mist/82 transition-colors duration-300 hover:text-warm-sand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-[0.68rem] uppercase tracking-[0.36em] text-rain-mist/45">
              Connect
            </p>

            <div className="mt-5 flex items-center gap-3 text-rain-mist">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 transition-all duration-300 hover:border-warm-sand/40 hover:text-warm-sand"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://x.com/thesoftapclypse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 transition-all duration-300 hover:border-warm-sand/40 hover:text-warm-sand"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@softapocalypse.in"
                aria-label="Send email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 transition-all duration-300 hover:border-warm-sand/40 hover:text-warm-sand"
              >
                <Mail size={18} />
              </a>
            </div>

            <p className="mt-6 max-w-xs font-body text-sm leading-7 text-rain-mist/62">
              Patron and judge reveals drop first on{' '}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rain-mist underline decoration-warm-sand/80 underline-offset-4 transition-colors duration-300 hover:text-warm-sand"
              >
                @softapocalypse.in
              </a>
              .
            </p>

            <a
              href="mailto:hello@softapocalypse.in"
              className="mt-6 inline-block font-body text-base text-rain-mist/72 transition-colors duration-300 hover:text-warm-sand"
            >
              hello@softapocalypse.in
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.24em] text-rain-mist/36 sm:flex-row sm:items-center sm:justify-between">
          <p>Made for a generation writing in public.</p>
          <p>&copy; {new Date().getFullYear()} Soft Apocalypse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
