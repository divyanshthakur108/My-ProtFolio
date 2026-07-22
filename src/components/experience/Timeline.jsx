import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ── Single glowing node on the timeline ── */
const TimelineNode = ({ index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Outer glow ring — pulses once when entering viewport */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isInView
            ? { scale: [0, 1.6, 1], opacity: [0, 0.6, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1, ease: "easeOut", delay: index * 0.12 }}
        className="absolute h-14 w-14 rounded-full bg-purple-500/30"
      />

      {/* Outer circle — ambient glow ring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
        className="flex h-12 w-12 items-center justify-center rounded-full
          border border-purple-500/20 bg-[#1e1e1e]/80 backdrop-blur-sm
          shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      >
        {/* Inner glowing dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: index * 0.12 + 0.15,
          }}
          className="h-4 w-4 rounded-full
            bg-gradient-to-br from-[#7C3AED] to-[#A855F7]
            shadow-[0_0_16px_rgba(139,92,246,0.6)]"
        />
      </motion.div>
    </div>
  );
};

/* ── Full vertical timeline (line + nodes) ── */
const Timeline = ({ itemCount }) => {
  const containerRef = useRef(null);

  /* Track scroll progress through the timeline container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  /* Map scroll progress → line scaleY (0 → 1) */
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* Gradient line that grows on scroll */}
      <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-white/[0.04]" />

        {/* Animated growing line */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 bg-gradient-to-b from-[#7C3AED] to-[#A855F7]"
        />
      </div>

      {/* Nodes — evenly distributed along the timeline */}
      <div className="relative flex h-full w-full flex-col justify-between">
        {Array.from({ length: itemCount }).map((_, i) => (
          <TimelineNode key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
