import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import Timeline from "./experience/Timeline";
import ExperienceCard from "./experience/ExperienceCard";
import { experienceData } from "./experience/experienceData";

const Experience = () => {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-full overflow-hidden bg-dark-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* ── Subtle purple radial glow behind the timeline ── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2
            rounded-full bg-purple-600/[0.04]
            blur-[80px] sm:left-[15%] sm:h-[700px] sm:w-[700px] sm:translate-x-0 sm:blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mx-auto inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs text-white/80 sm:text-sm">
            <FaBriefcase className="mr-2 text-purple-500" />
            Work Experience
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:mt-6 sm:text-5xl">
            <span className="text-white">Work</span>{" "}
            <span className="text-purple-500">Experience</span>
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:mt-4 sm:text-lg">
            My professional journey so far
          </p>
        </motion.div>

        {/* ── Timeline + Cards Grid ── */}
        <div className="grid grid-cols-[36px_1fr] gap-x-3 sm:grid-cols-[60px_1fr] sm:gap-x-10">
          {/* Timeline column */}
          <Timeline itemCount={experienceData.length} />

          {/* Cards column */}
          <div className="flex flex-col gap-10 sm:gap-16">
            {experienceData.map((item, index) => (
              <ExperienceCard key={item.company} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
