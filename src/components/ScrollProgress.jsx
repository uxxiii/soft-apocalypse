import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-storm-slate shadow-[0_0_18px_rgba(44,74,110,0.45)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
