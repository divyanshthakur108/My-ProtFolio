import { motion } from "framer-motion";
import TechBadge from "./TechBadge";

const ExperienceCard = ({ item, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 30px 60px rgba(139,92,246,0.2)",
      }}
      className="group relative rounded-3xl
        border border-white/[0.06]
        bg-[rgba(30,30,30,0.8)] backdrop-blur-xl
        p-5 sm:p-8
        shadow-[0_16px_48px_rgba(0,0,0,0.4)]
        transition-all duration-400
        hover:border-purple-500/30
        hover:shadow-[0_30px_60px_rgba(139,92,246,0.2)]"
    >
      {/* ── Company Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-purple-400/80">
            {item.company}
          </p>
        </div>

        <span
          className="inline-flex w-fit shrink-0 items-center rounded-full
            bg-purple-500/10 px-4 py-2
            text-xs font-semibold tracking-wide text-purple-300
            ring-1 ring-purple-500/20"
        >
          {item.duration}
        </span>
      </div>

      {/* ── Bullet Points ── */}
      <ul className="mt-6 space-y-3">
        {item.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 + i * 0.06 }}
            className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-[15px]"
          >
            <span className="mt-0.5 shrink-0 text-emerald-400">✔</span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      {/* ── Technologies ── */}
      {item.technologies?.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-2.5">
          {item.technologies.map((tech, i) => (
            <TechBadge key={tech} name={tech} index={i} />
          ))}
        </div>
      )}
    </motion.article>
  );
};

export default ExperienceCard;
