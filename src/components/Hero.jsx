import { motion } from "framer-motion";
import ProfileImage from "./hero/ProfileImage";
import TypingText from "./hero/TypingText";
import HeroButtons from "./hero/HeroButtons";
import SocialLinks from "./hero/SocialLinks";

const Hero = () => {
  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen overflow-hidden bg-dark-100"
    >
      {/* ── Premium Background ─────────────────────────────── */}
      {/* Base radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,.25),transparent_70%)]" />

      {/* Secondary glow — bottom right */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(139,92,246,.12),transparent_60%)]" />

      {/* Floating blurred blobs */}
      <div className="pointer-events-none absolute top-[15%] left-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-[5%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-violet-500/6 blur-[100px]" />
      <div className="pointer-events-none absolute top-[60%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-pink-500/5 blur-[110px]" />

      {/* Subtle grid pattern */}
      <div className="hero-bg-grid pointer-events-none absolute inset-0" />

      {/* Glass top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* ── Hero Content ───────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen items-center px-6 pt-24 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* ── Text Column ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="order-2 w-full max-w-2xl text-center lg:order-1 lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 text-lg font-medium tracking-wide text-purple-400/80 sm:text-xl"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                Divyansh Thakur
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <TypingText />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg lg:max-w-lg"
            >
              I create stunning web experiences with modern technologies and
              innovative design. Passionate about building scalable,
              user-focused applications.
            </motion.p>

            {/* Buttons */}
            <HeroButtons />

            {/* Social Links */}
            <SocialLinks />
          </motion.div>

          {/* ── Image Column ─────────────────────────────── */}
          <div className="order-1 flex w-full justify-center lg:order-2 lg:w-auto lg:justify-end">
            <ProfileImage />
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <a
          href="/#about"
          aria-label="Scroll down to About section"
          className="scroll-indicator flex flex-col items-center gap-2 text-white/30 transition-colors duration-300 hover:text-purple-400"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-purple-400"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
