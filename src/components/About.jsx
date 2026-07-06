import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Brush } from "lucide-react";
import profileImage from "../assets/profile.avif";

const cards = [
  {
    icon: Lightbulb,
    title: "Innovative",
    description:
      "I enjoy building creative solutions and solving challenging problems using modern web technologies.",
  },
  {
    icon: Brush,
    title: "Design Oriented",
    description:
      "I focus on creating clean, responsive and user-friendly interfaces with excellent user experience.",
  },
];

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#1a1a1a] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-white">About</span>{" "}
            <span className="text-purple-500">Me</span>
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Get to know more about my background and passion
          </p>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-start lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[45%]"
          >
            <div className="group overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full rounded-[2rem] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[55%]"
          >
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              My Journey
            </h3>
            <div className="mt-6 space-y-6 text-white/80 text-base leading-8 sm:text-lg">
              <p>
                I&apos;m a passionate Full Stack MERN Developer focused on
                building modern, responsive and scalable web applications using
                React, Node.js, Express.js and MongoDB.
              </p>
              <p>
                I enjoy solving real-world problems, learning new technologies
                and creating beautiful user experiences. My goal is to become a
                professional software engineer and contribute to impactful
                projects.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 25px 45px rgba(139,92,246,0.18)",
                    }}
                    className="rounded-2xl bg-[#262626] p-8 transition duration-300"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-500/10 text-purple-300">
                      <Icon size={28} />
                    </div>
                    <h4 className="mt-6 text-xl font-semibold text-white">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-white/70">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
