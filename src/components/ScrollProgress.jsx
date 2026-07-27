import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-warm-sand via-storm-slate to-warm-sand shadow-[0_0_18px_rgba(196,168,130,0.45)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
