import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaCloud,
  FaTools,
} from "react-icons/fa";

const skillCards = [
  {
    icon: FaReact,
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces using modern web technologies.",
    tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    icon: FaServer,
    title: "Backend Development",
    description: "Creating secure REST APIs and scalable backend applications.",
    tags: ["Node.js", "Express.js", "JWT", "REST API", "MVC"],
  },
  {
    icon: FaDatabase,
    title: "Database",
    description: "Managing and designing databases for scalable applications.",
    tags: ["MongoDB", "Mongoose", "Firebase"],
  },
  {
    icon: FaMobileAlt,
    title: "Responsive Design",
    description:
      "Creating responsive websites that work perfectly on every device.",
    tags: ["Flexbox", "Grid", "Media Queries"],
  },
  {
    icon: FaCloud,
    title: "Deployment",
    description: "Deploying applications using modern cloud platforms.",
    tags: ["Git", "GitHub", "Vercel", "Render", "Netlify"],
  },
  {
    icon: FaTools,
    title: "Tools & Technologies",
    description: "Daily tools I use during development.",
    tags: ["VS Code", "Postman", "Figma", "npm", "Git"],
  },
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#1a1a1a] px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-white">My</span>{" "}
            <span className="text-purple-500">Skills</span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {skillCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{ y: -10 }}
                className="rounded-3xl bg-[#2a2a2a] p-8 shadow-xl shadow-black/30 transition duration-300 ease-out hover:border hover:border-purple-500 hover:shadow-purple-500/30"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-500/10 text-purple-400">
                  <Icon size={28} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-base text-white/70 leading-7">
                  {card.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#1f1f1f] px-4 py-2 text-sm font-medium text-white/80 transition duration-300 hover:scale-105 hover:border hover:border-purple-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
