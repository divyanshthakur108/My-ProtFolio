import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCircle } from "react-icons/fa";

const experienceData = [
  {
    title: "Full Stack MERN Developer",
    company: "Freelance Projects",
    duration: "2025 - Present",
    description:
      "Building full-stack MERN applications including authentication, REST APIs, dashboards, URL shorteners, portfolio websites and responsive user interfaces using React, Node.js, Express.js and MongoDB.",
  },
  {
    title: "Frontend Developer",
    company: "Personal Portfolio Projects",
    duration: "2024 - 2025",
    description:
      "Developed responsive websites using HTML, CSS, JavaScript, React, Tailwind CSS and Framer Motion while focusing on clean UI and performance.",
  },
  {
    title: "Learning MERN Stack",
    company: "Self Learning",
    duration: "2023 - 2024",
    description:
      "Learned HTML, CSS, JavaScript, Git, GitHub, React, Node.js, Express.js, MongoDB and completed multiple real-world projects.",
  },
];

const Experience = () => {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-dark-100 px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <div className="mx-auto inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">
            <FaBriefcase className="mr-2 text-purple-500" />
            Work Experience
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-white">Work</span>{" "}
            <span className="text-purple-500">Experience</span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            My professional journey so far
          </p>
        </motion.div>

        <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-10 gap-y-12">
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.75 -translate-x-1/2 bg-[#7C3AED]" />
            <div className="relative flex flex-col items-center gap-27.5 pt-6">
              {experienceData.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2a2a] shadow-2xl"
                >
                  <div className="h-4.5 w-4.5 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.35)]" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-27.5">
            {experienceData.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 45px rgba(139,92,246,0.2)",
                }}
                className="rounded-3xl bg-[#2a2a2a] p-8 shadow-2xl shadow-black/20 transition duration-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60">{item.company}</p>
                    <p className="mt-6 text-base leading-7 text-white/70">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center justify-center rounded-3xl bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-200 lg:mt-0">
                    {item.duration}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
