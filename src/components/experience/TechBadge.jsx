import { motion } from "framer-motion";

const TechBadge = ({ name, index }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-block cursor-default rounded-full
        bg-gradient-to-r from-purple-600/20 to-violet-500/20
        px-4 py-1.5 text-xs font-medium text-purple-300
        ring-1 ring-purple-500/20
        transition-shadow duration-300
        hover:shadow-[0_0_16px_rgba(139,92,246,0.3)]
        hover:ring-purple-400/40"
    >
      {name}
    </motion.span>
  );
};

export default TechBadge;
