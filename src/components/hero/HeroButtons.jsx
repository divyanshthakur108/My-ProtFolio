import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HeroButtons = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 flex flex-col gap-4 sm:flex-row"
    >
      {/* Primary Button — Gradient Purple */}
      <motion.a
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(139,92,246,.35)" }}
        whileTap={{ scale: 0.97 }}
        href="/#projects"
        className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        aria-label="View my projects"
      >
        <span>View Work</span>
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </motion.a>

      {/* Secondary Button — Glass Effect */}
      <motion.a
        variants={itemVariants}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.97 }}
        href="/#contact"
        className="hero-btn-secondary group inline-flex items-center justify-center gap-2.5 rounded-xl border border-purple-500/30 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        aria-label="Contact me"
      >
        <Mail
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
        <span>Contact Me</span>
      </motion.a>
    </motion.div>
  );
};

export default HeroButtons;
