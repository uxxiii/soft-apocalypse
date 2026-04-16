import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* Layout */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

/* Pages */
import Home from './pages/Home';
import Patrons from './pages/Patrons';
import PatronProfile from './pages/PatronProfile';
import Judges from './pages/Judges';
import JudgeProfile from './pages/JudgeProfile';
import Rewards from './pages/Rewards';
import Submission from './pages/Submission';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

/**
 * ScrollToTop — Resets scroll position on route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * PageTransition — Wraps each page in a subtle fade animation.
 */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col text-deep-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,245,239,0.92)_0%,rgba(232,237,242,0.96)_52%,rgba(245,247,250,0.95)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(23,34,52,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(23,34,52,0.35)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-warm-sand/30 blur-3xl" />
        <div className="absolute right-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-storm-slate/16 blur-3xl" />
        <div className="absolute bottom-[-9rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute bottom-16 right-12 h-48 w-48 rounded-full bg-warm-sand/14 blur-3xl" />
      </div>

      <ScrollToTop />
      <ScrollProgress />
      <Navbar />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/patrons" element={<PageTransition><Patrons /></PageTransition>} />
            <Route path="/patrons/:slug" element={<PageTransition><PatronProfile /></PageTransition>} />
            <Route path="/judges" element={<PageTransition><Judges /></PageTransition>} />
            <Route path="/judges/:slug" element={<PageTransition><JudgeProfile /></PageTransition>} />
            <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
            <Route path="/submission" element={<PageTransition><Submission /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
