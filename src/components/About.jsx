import { motion } from "framer-motion";

const cards = [
  {
    emoji: "💼",
    title: "Experience",
    description: "Building Full Stack MERN Applications",
  },
  {
    emoji: "🚀",
    title: "Projects",
    description: "10+ Real-world Projects",
  },
  {
    emoji: "📚",
    title: "Learning",
    description: "Always Learning New Technologies",
  },
  {
    emoji: "🎯",
    title: "Goal",
    description: "Become a Professional Software Engineer",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <motion.section
      id="about"
      aria-label="About me"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-full overflow-hidden bg-dark-100 px-4 py-16 sm:px-8 sm:py-28 lg:px-10"
    >
      {/* Background accent glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-purple-600/6 blur-[80px] sm:h-[500px] sm:w-[700px] sm:blur-[140px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* ── Section Header ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/50 sm:mt-4 sm:text-lg">
            Get to know more about my background and passion.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ────────────────────────── */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
          {/* ── Left: My Journey ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              My{" "}
              <span className="text-purple-400">Journey</span>
            </h3>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-white/65 sm:text-lg">
              <p>
                I&apos;m a passionate Full Stack MERN Developer focused on
                building modern, responsive and scalable web applications using
                React, Node.js, Express.js and MongoDB.
              </p>
              <p>
                I enjoy solving real-world problems, learning new technologies
                and creating beautiful user experiences. I&apos;m constantly
                pushing myself to grow as a developer and stay current with
                industry best practices.
              </p>
              <p>
                My goal is to become a professional software engineer and
                contribute to impactful projects that make a difference.
              </p>
            </div>
          </motion.div>

          {/* ── Right: 2×2 Cards Grid ────────────────── */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:w-1/2">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(139,92,246,0.15)",
                }}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl"
                  aria-hidden="true"
                >
                  {card.emoji}
                </span>
                <h4 className="mt-5 text-lg font-semibold text-white">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
