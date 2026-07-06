import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import profileImage from "../assets/profile.avif";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const phrases = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React Developer",
  "Frontend Developer",
];

const AnimatedTyping = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1),
      );

      if (!isDeleting && text === current) {
        setIsDeleting(true);
        setSpeed(1200);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
        setSpeed(80);
      } else {
        setSpeed(isDeleting ? 40 : 80);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, speed]);

  return (
    <p className="mt-8 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
      {text}
      <span className="typing-cursor">|</span>
    </p>
  );
};

const Hero = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#242424] to-[#2d2d2d] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <a
            href="/#home"
            className="flex flex-col items-start gap-1 text-lg font-semibold sm:text-xl"
          >
            <span className="text-white">Divyansh</span>
            <span className="text-purple-500">Thakur</span>
            <span className="h-2 w-2 rounded-full bg-purple-500" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={() => setActiveItem(item)}
                className={`transition duration-300 ${
                  activeItem === item
                    ? "text-purple-500"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition duration-300 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#111111]/95 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:px-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => {
                    setActiveItem(item);
                    setMenuOpen(false);
                  }}
                  className={`rounded-2xl px-4 py-3 text-base transition duration-300 ${
                    activeItem === item
                      ? "bg-purple-500/10 text-purple-500"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <motion.div
        id="home"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex min-h-screen items-center px-6 pt-28 pb-12 sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-16 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full max-w-2xl text-center lg:text-left"
          >
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-purple-500">Divyansh Thakur</span>
            </h1>

            <AnimatedTyping />

            <p className="mt-8 max-w-xl text-base text-white/70 sm:text-lg">
              I create stunning web experiences with modern technologies and
              innovative design.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#projects"
                className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-purple-600"
              >
                View Work
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl border border-purple-500 bg-transparent px-8 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-purple-500/20"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex w-full justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-purple-500/40 via-transparent to-pink-500/40 blur-3xl" />
              <div className="relative overflow-hidden rounded-full border border-white/10 bg-white p-4 shadow-2xl shadow-black/30 sm:p-6 lg:p-8">
                <img
                  src={profileImage}
                  alt="Emma Watson"
                  className="h-[320px] w-[320px] rounded-full object-cover sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
